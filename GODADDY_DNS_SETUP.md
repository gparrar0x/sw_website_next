# Configuración DNS de GoDaddy para Vercel

Esta guía te ayudará a configurar automáticamente tu dominio de GoDaddy para que apunte a Vercel usando la API de GoDaddy.

## Prerequisitos

1. Tener un dominio en GoDaddy (ej: `skywalking.dev`)
2. Credenciales de API de GoDaddy

## Paso 1: Obtener Credenciales de API de GoDaddy

1. Ve a https://developer.godaddy.com/keys
2. Inicia sesión con tu cuenta de GoDaddy
3. Haz clic en **"Create New API Key"**
4. Configura:
   - **Name:** Vercel DNS Configuration
   - **Environment:** Production (para usar con dominio real)
   - **Key Type:** All domains (o selecciona solo tu dominio)
5. Haz clic en **"Create"**
6. **IMPORTANTE:** Copia y guarda tu **API Key** y **API Secret** de inmediato. No podrás volver a verlos.

## Paso 2: Configurar Variables de Entorno

1. Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

2. Edita el archivo `.env` y completa con tus credenciales:

```env
GODADDY_API_KEY=tu_api_key_aqui
GODADDY_API_SECRET=tu_api_secret_aqui
DOMAIN=skywalking.dev
```

**IMPORTANTE:** El archivo `.env` ya está en `.gitignore` y NO se subirá a Git (por seguridad).

## Paso 3: Ejecutar el Script de Configuración

### Opción A: Script Node.js (Recomendado)

```bash
node scripts/configure_godaddy_dns.js
```

### Opción B: Script Bash

```bash
./scripts/configure_godaddy_dns.sh
```

## ¿Qué hace el script?

El script configura automáticamente dos registros DNS:

1. **Registro A (Apex domain)**
   - Tipo: A
   - Nombre: @
   - Valor: 76.76.21.21 (IP de Vercel)
   - TTL: 600 segundos

2. **Registro CNAME (Subdominio www)**
   - Tipo: CNAME
   - Nombre: www
   - Valor: cname.vercel-dns.com
   - TTL: 600 segundos

## Paso 4: Verificar Configuración

El script verificará automáticamente que los registros se hayan configurado correctamente.

También puedes verificar manualmente con:

```bash
# Verificar dominio principal
dig skywalking.dev

# Verificar subdominio www
dig www.skywalking.dev

# Verificar desde diferentes servidores DNS (propagación)
dig @8.8.8.8 skywalking.dev
dig @1.1.1.1 skywalking.dev
```

Deberías ver:
- `skywalking.dev` → `76.76.21.21`
- `www.skywalking.dev` → `cname.vercel-dns.com` → IP de Vercel

## Paso 5: Configurar Dominio en Vercel

1. Ve a tu proyecto en Vercel: https://vercel.com/gparrar0x/sw-website-next
2. Ve a **Settings** → **Domains**
3. Haz clic en **"Add"**
4. Agrega tu dominio: `skywalking.dev`
5. Haz clic en **"Add"** nuevamente
6. Agrega: `www.skywalking.dev`

Vercel detectará automáticamente que los registros DNS ya están configurados correctamente.

## Paso 6: Esperar Propagación DNS

- **Tiempo mínimo:** 5-30 minutos
- **Tiempo máximo:** 48 horas (raro)

Puedes verificar la propagación global en:
- https://dnschecker.org
- Ingresa tu dominio (`skywalking.dev`)
- Tipo de registro: A

## Paso 7: Configurar SSL (Automático)

Vercel configurará automáticamente un certificado SSL gratuito de Let's Encrypt para tu dominio. Esto puede tomar 1-2 minutos adicionales después de que el DNS se haya propagado.

Una vez completado, tu sitio estará disponible en:
- https://skywalking.dev
- https://www.skywalking.dev

## Troubleshooting

### Error: "Unauthorized" o "Invalid credentials"

- Verifica que tu API Key y Secret sean correctos
- Asegúrate de estar usando credenciales de **Production** (no OTE)
- Revisa que la API Key tenga permisos sobre el dominio

### Error: "Domain not found"

- Verifica que el dominio en `.env` sea exactamente el que posees en GoDaddy
- No incluyas `www.` en la variable `DOMAIN`
- El dominio debe estar activo en tu cuenta de GoDaddy

### Los cambios DNS no se reflejan

- Espera al menos 5-10 minutos
- Limpia tu caché DNS local:
  ```bash
  # macOS
  sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

  # Windows
  ipconfig /flushdns

  # Linux
  sudo systemd-resolve --flush-caches
  ```

### Vercel dice "DNS not configured"

- Espera a que DNS se propague completamente (5-30 minutos)
- Verifica con `dig` que los registros estén correctos
- Intenta remover y agregar el dominio nuevamente en Vercel

## Verificación Manual en GoDaddy

Si prefieres verificar o configurar manualmente:

1. Ve a https://dcc.godaddy.com/manage/dns
2. Selecciona tu dominio
3. Verifica que existan estos registros:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.21.21 | 600 |
| CNAME | www | cname.vercel-dns.com | 600 |

## Revertir Cambios

Si necesitas revertir los cambios DNS:

1. Guarda los valores antiguos antes de ejecutar el script (opcional)
2. Para revertir, ejecuta manualmente en la API de GoDaddy o en el panel web
3. O puedes modificar el script para usar tus valores anteriores

## Scripts Adicionales

### Obtener todos los registros DNS actuales

```bash
curl -X GET "https://api.godaddy.com/v1/domains/skywalking.dev/records" \
  -H "Authorization: sso-key $GODADDY_API_KEY:$GODADDY_API_SECRET"
```

### Eliminar un registro específico

```bash
curl -X DELETE "https://api.godaddy.com/v1/domains/skywalking.dev/records/A/@" \
  -H "Authorization: sso-key $GODADDY_API_KEY:$GODADDY_API_SECRET"
```

## Seguridad

- **NUNCA** subas tu archivo `.env` a Git
- **NUNCA** compartas tus API keys públicamente
- Usa credenciales de Production solo cuando estés listo para el cambio
- Considera usar credenciales OTE (sandbox) para testing

## Referencias

- [GoDaddy API Documentation](https://developer.godaddy.com/doc/endpoint/domains)
- [Vercel Custom Domains](https://vercel.com/docs/concepts/projects/domains)
- [DNS Records Explained](https://vercel.com/docs/concepts/projects/domains/dns-records)

## Soporte

Si encuentras problemas:

1. Verifica los logs del script
2. Prueba el endpoint de la API manualmente con curl
3. Revisa la consola de GoDaddy para ver los registros
4. Contacta soporte de GoDaddy si los cambios no se aplican
