#!/usr/bin/env node

/**
 * Script para configurar DNS de GoDaddy para Vercel
 *
 * Uso:
 *   node scripts/configure_godaddy_dns.js
 *
 * Requiere archivo .env con:
 *   GODADDY_API_KEY=xxx
 *   GODADDY_API_SECRET=xxx
 *   DOMAIN=skywalking.dev
 */

require('dotenv').config();
const https = require('https');

// Configuración
const config = {
  apiKey: process.env.GODADDY_API_KEY,
  apiSecret: process.env.GODADDY_API_SECRET,
  domain: process.env.DOMAIN || 'skywalking.dev',
  vercelIP: '76.76.21.21',
  vercelCNAME: 'cname.vercel-dns.com'
};

// Validar configuración
function validateConfig() {
  const missing = [];
  if (!config.apiKey) missing.push('GODADDY_API_KEY');
  if (!config.apiSecret) missing.push('GODADDY_API_SECRET');

  if (missing.length > 0) {
    console.error('\n❌ Error: Faltan variables de entorno:\n');
    missing.forEach(v => console.error(`  - ${v}`));
    console.error('\nCrea un archivo .env basándote en .env.example\n');
    process.exit(1);
  }
}

// Hacer request a GoDaddy API
function godaddyRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.godaddy.com',
      port: 443,
      path: `/v1${path}`,
      method: method,
      headers: {
        'Authorization': `sso-key ${config.apiKey}:${config.apiSecret}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({
            statusCode: res.statusCode,
            body: body ? JSON.parse(body) : null
          });
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Obtener registros DNS actuales
async function getCurrentRecords() {
  console.log('🔍 Obteniendo registros DNS actuales...');
  try {
    const result = await godaddyRequest('GET', `/domains/${config.domain}/records`);
    return result.body;
  } catch (error) {
    console.error(`❌ Error obteniendo registros: ${error.message}`);
    throw error;
  }
}

// Configurar registro A para dominio principal
async function configureApexRecord() {
  console.log('\n📝 Configurando registro A para dominio principal (@)...');

  const record = [{
    type: 'A',
    name: '@',
    data: config.vercelIP,
    ttl: 600
  }];

  try {
    await godaddyRequest('PUT', `/domains/${config.domain}/records/A/@`, record);
    console.log(`✅ Registro A configurado: ${config.domain} → ${config.vercelIP}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    throw error;
  }
}

// Configurar registro CNAME para www
async function configureWWWRecord() {
  console.log('\n📝 Configurando registro CNAME para www...');

  const record = [{
    type: 'CNAME',
    name: 'www',
    data: config.vercelCNAME,
    ttl: 600
  }];

  try {
    await godaddyRequest('PUT', `/domains/${config.domain}/records/CNAME/www`, record);
    console.log(`✅ Registro CNAME configurado: www.${config.domain} → ${config.vercelCNAME}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    throw error;
  }
}

// Verificar configuración
async function verifyConfiguration() {
  console.log('\n🔍 Verificando configuración...');

  try {
    const records = await getCurrentRecords();

    const aRecord = records.find(r => r.type === 'A' && r.name === '@');
    const cnameRecord = records.find(r => r.type === 'CNAME' && r.name === 'www');

    console.log('\n📋 Registros DNS configurados:');

    if (aRecord) {
      console.log(`  ✓ A    @ → ${aRecord.data}`);
    } else {
      console.log(`  ✗ A    @ → No configurado`);
    }

    if (cnameRecord) {
      console.log(`  ✓ CNAME www → ${cnameRecord.data}`);
    } else {
      console.log(`  ✗ CNAME www → No configurado`);
    }

    return aRecord && cnameRecord;
  } catch (error) {
    console.error(`❌ Error verificando: ${error.message}`);
    return false;
  }
}

// Main
async function main() {
  console.log('🌐 Configurador DNS GoDaddy → Vercel\n');
  console.log(`Dominio: ${config.domain}\n`);

  validateConfig();

  try {
    // Mostrar estado actual
    await getCurrentRecords();

    // Configurar registros
    await configureApexRecord();
    await configureWWWRecord();

    // Verificar
    const success = await verifyConfiguration();

    if (success) {
      console.log('\n✅ ¡Configuración DNS completada exitosamente!\n');
      console.log('⏱️  Los cambios pueden tardar hasta 48 horas en propagarse');
      console.log('    (usualmente 5-30 minutos).\n');
      console.log('🔍 Verificar propagación:');
      console.log(`    dig ${config.domain}`);
      console.log(`    dig www.${config.domain}\n`);
      console.log('🚀 Próximos pasos:');
      console.log('    1. Ve a Vercel Dashboard');
      console.log('    2. Settings → Domains → Add Domain');
      console.log(`    3. Agrega: ${config.domain} y www.${config.domain}\n`);
    } else {
      console.log('\n⚠️  Configuración completada con advertencias. Revisa los registros.\n');
    }

  } catch (error) {
    console.error('\n❌ Error durante la configuración:');
    console.error(error.message);
    console.error('\nRevisa:');
    console.error('  - Tus credenciales de API en .env');
    console.error('  - Que el dominio sea correcto');
    console.error('  - Que tengas permisos sobre el dominio\n');
    process.exit(1);
  }
}

// Ejecutar
if (require.main === module) {
  main();
}

module.exports = { configureApexRecord, configureWWWRecord, verifyConfiguration };
