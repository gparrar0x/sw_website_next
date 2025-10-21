# Configuración Manual DNS - Últimos Pasos

## ✅ Lo que ya está hecho

1. ✅ Proyecto vinculado con Vercel
2. ✅ Deployment en producción completado
3. ✅ Dominio `skywalking.dev` agregado en Vercel
4. ✅ URL de producción: https://sw-website-next-lrkhwynyg-gparrar-3019s-projects.vercel.app

## 🔧 Lo que necesitas hacer manualmente

Las credenciales de GoDaddy API que tienes configuradas **no tienen permisos** para modificar DNS. Necesitas configurar los registros DNS manualmente desde el panel de GoDaddy.

### Paso 1: Acceder al Panel DNS de GoDaddy

1. Ve a https://dcc.godaddy.com/manage/dns
2. Inicia sesión con tu cuenta
3. Selecciona el dominio **skywalking.dev**
4. Haz clic en **"DNS"** o **"Administrar DNS"**

### Paso 2: Configurar Registro A (Dominio Principal)

Busca si ya existe un registro A para `@` (dominio principal):

**Si existe:**
- Haz clic en el ícono de lápiz ✏️ para editarlo
- Cambia el valor a: `76.76.21.21`
- TTL: `600` segundos (o el que prefieras)
- Guarda los cambios

**Si no existe:**
- Haz clic en **"Agregar"** o **"Add Record"**
- Tipo: `A`
- Nombre: `@`
- Valor: `76.76.21.21`
- TTL: `600` segundos
- Guarda

### Paso 3: Configurar Registro CNAME (www)

Busca si ya existe un registro CNAME para `www`:

**Si existe:**
- Haz clic en el ícono de lápiz ✏️ para editarlo
- Cambia el valor a: `cname.vercel-dns.com`
- TTL: `600` segundos
- Guarda los cambios

**Si no existe:**
- Haz clic en **"Agregar"** o **"Add Record"**
- Tipo: `CNAME`
- Nombre: `www`
- Valor: `cname.vercel-dns.com`
- TTL: `600` segundos
- Guarda

### Paso 4: Tabla de Referencia

Tu DNS debe quedar así:

| Tipo | Nombre | Valor | TTL |
|------|--------|-------|-----|
| A | @ | 76.76.21.21 | 600 |
| CNAME | www | cname.vercel-dns.com | 600 |

### Paso 5: Verificar Propagación

**Espera 5-30 minutos** para que los cambios DNS se propaguen, luego verifica:

```bash
# Verificar dominio principal
dig skywalking.dev

# Verificar www
dig www.skywalking.dev

# Verificar desde Google DNS
dig @8.8.8.8 skywalking.dev

# Verificar desde Cloudflare DNS
dig @1.1.1.1 skywalking.dev
```

**Lo que debes ver:**
- `skywalking.dev` debe resolver a `76.76.21.21`
- `www.skywalking.dev` debe resolver a `cname.vercel-dns.com` y luego a una IP de Vercel

### Paso 6: Verificar en Vercel

1. Ve a https://vercel.com/gparrar-3019s-projects/sw-website-next
2. Ve a **Settings** → **Domains**
3. Deberías ver `skywalking.dev` con estado:
   - ⏳ **Pending** (esperando verificación DNS)
   - ✅ **Valid** (DNS configurado correctamente)

Una vez que Vercel detecte los registros DNS, automáticamente:
- Verificará el dominio
- Generará certificado SSL (Let's Encrypt)
- Tu sitio estará disponible en https://skywalking.dev

## 🚀 URLs Finales

Una vez completada la configuración DNS:

- **Producción:** https://skywalking.dev
- **www:** https://www.skywalking.dev
- **Presupuesto ejemplo:** https://skywalking.dev/clinica/presupuesto

## 🔍 Herramientas de Verificación

- **DNS Checker Global:** https://dnschecker.org
- **Vercel DNS Inspector:** https://vercel.com/docs/concepts/projects/domains/inspect
- **Google Dig:** https://toolbox.googleapps.com/apps/dig/

## ⚠️ Troubleshooting

### "Domain not verified" en Vercel

**Solución:** Espera a que DNS se propague (5-30 minutos). Vercel verifica automáticamente cada pocos minutos.

### DNS no propaga

**Solución:**
1. Limpia caché DNS local:
   ```bash
   # macOS
   sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder

   # Windows
   ipconfig /flushdns

   # Linux
   sudo systemd-resolve --flush-caches
   ```

2. Verifica en https://dnschecker.org que los registros estén correctos en diferentes ubicaciones globales

### SSL Certificate no se genera

**Solución:** El certificado SSL se genera automáticamente una vez que DNS está verificado. Puede tomar 1-2 minutos adicionales después de la verificación DNS.

## 📧 Soporte

Si tienes problemas:

1. Verifica que los registros DNS estén exactamente como se muestra arriba
2. Espera al menos 30 minutos para propagación DNS
3. Revisa el dashboard de Vercel para mensajes de error
4. Contacta soporte de GoDaddy si los cambios DNS no se aplican

## 🎯 Próximo Paso

Una vez que DNS esté configurado y propagado, tu sitio estará disponible en:

🌐 **https://skywalking.dev**

¡Todo lo demás ya está listo! El sitio está desplegado, las rutas funcionan, el formulario está conectado a Google Sheets, y las analytics están activas.
