#!/bin/bash

# Script para configurar DNS de GoDaddy para apuntar a Vercel
# Uso: ./scripts/configure_godaddy_dns.sh

set -e

# Cargar variables de entorno
if [ -f .env ]; then
  export $(cat .env | grep -v '^#' | xargs)
fi

# Validar variables requeridas
if [ -z "$GODADDY_API_KEY" ] || [ -z "$GODADDY_API_SECRET" ] || [ -z "$DOMAIN" ]; then
  echo "❌ Error: Faltan variables de entorno"
  echo ""
  echo "Crea un archivo .env con:"
  echo "GODADDY_API_KEY=tu_api_key"
  echo "GODADDY_API_SECRET=tu_api_secret"
  echo "DOMAIN=skywalking.dev"
  exit 1
fi

# Headers de autorización
AUTH_HEADER="Authorization: sso-key $GODADDY_API_KEY:$GODADDY_API_SECRET"
API_BASE="https://api.godaddy.com/v1"

echo "🌐 Configurando DNS para $DOMAIN..."
echo ""

# Vercel DNS Records
# Para dominio principal (apex domain)
APEX_RECORD='[
  {
    "type": "A",
    "name": "@",
    "data": "76.76.21.21",
    "ttl": 600
  }
]'

# Para subdominio www
WWW_RECORD='[
  {
    "type": "CNAME",
    "name": "www",
    "data": "cname.vercel-dns.com",
    "ttl": 600
  }
]'

echo "📝 Configurando registro A para dominio principal..."
curl -X PUT "$API_BASE/domains/$DOMAIN/records/A/@" \
  -H "$AUTH_HEADER" \
  -H "Content-Type: application/json" \
  -d "$APEX_RECORD" \
  -w "\nStatus: %{http_code}\n"

echo ""
echo "📝 Configurando registro CNAME para www..."
curl -X PUT "$API_BASE/domains/$DOMAIN/records/CNAME/www" \
  -H "$AUTH_HEADER" \
  -H "Content-Type: application/json" \
  -d "$WWW_RECORD" \
  -w "\nStatus: %{http_code}\n"

echo ""
echo "✅ Configuración DNS completada!"
echo ""
echo "📋 Registros configurados:"
echo "  - A    @ → 76.76.21.21 (Vercel)"
echo "  - CNAME www → cname.vercel-dns.com"
echo ""
echo "⏱️  Los cambios DNS pueden tardar hasta 48 horas en propagarse (usualmente 5-30 minutos)."
echo ""
echo "🔍 Verificar propagación:"
echo "  dig $DOMAIN"
echo "  dig www.$DOMAIN"
echo ""
echo "🚀 Próximo paso:"
echo "  1. Ve a Vercel Dashboard: https://vercel.com/gparrar0x/sw-website-next"
echo "  2. Settings → Domains → Add Domain"
echo "  3. Agrega: $DOMAIN y www.$DOMAIN"
