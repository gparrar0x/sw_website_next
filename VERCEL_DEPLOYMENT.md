# Guía de Deployment a Vercel

## Repositorio GitHub

Tu sitio está en: https://github.com/gparrar0x/sw_website_next

## Opción 1: Deployment desde Vercel Dashboard (Recomendado para primera vez)

### Paso 1: Crear cuenta en Vercel

1. Ve a https://vercel.com
2. Haz clic en "Sign Up"
3. Selecciona "Continue with GitHub"
4. Autoriza Vercel para acceder a tu cuenta de GitHub

### Paso 2: Importar el proyecto

1. En el dashboard de Vercel, haz clic en **"Add New..." → "Project"**
2. Busca el repositorio: **sw_website_next**
3. Haz clic en **"Import"**

### Paso 3: Configurar el proyecto

Vercel debería detectar automáticamente que es un proyecto Next.js. Verifica:

- **Framework Preset:** Next.js
- **Root Directory:** `./` (la raíz)
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

### Paso 4: Variables de entorno (Opcional)

Si necesitas agregar variables de entorno:

1. En "Environment Variables", agrega:
   - No hay variables de entorno requeridas por ahora
   - Todas las keys están en el código o son públicas (Google Sheets URL, Analytics)

### Paso 5: Deploy

1. Haz clic en **"Deploy"**
2. Espera 2-3 minutos mientras Vercel:
   - Clona el repositorio
   - Instala dependencias
   - Construye el proyecto
   - Despliega a CDN global

### Paso 6: ¡Listo!

Vercel te dará una URL como: `https://sw-website-next.vercel.app`

## Opción 2: Deployment desde CLI (Avanzado)

Si ya tienes Vercel CLI instalado:

```bash
# Instalar Vercel CLI (si no lo tienes)
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

## Configurar dominio personalizado

### Agregar skywalking.dev (o el dominio que uses)

1. En el dashboard del proyecto en Vercel, ve a **Settings → Domains**
2. Haz clic en **"Add"**
3. Ingresa tu dominio: `skywalking.dev` y `www.skywalking.dev`
4. Vercel te dará instrucciones para configurar DNS

#### Si tu dominio está en otro proveedor:

Agrega estos registros DNS:

**Para dominio principal (skywalking.dev):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**Para www:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### Si transferiste tu dominio a Vercel:

Vercel configurará todo automáticamente.

## Deployments automáticos

Vercel configuró automáticamente deployments en cada push:

- **Commits a `main`** → Deploy a producción (skywalking.dev)
- **Pull Requests** → Deploy preview (URL única para testing)
- **Commits a otras branches** → Deploy preview

## Verificar Analytics

Las analytics de Vercel ya están configuradas con `@vercel/analytics`:

1. Ve a tu proyecto en Vercel
2. Click en la pestaña **"Analytics"**
3. Verás métricas de:
   - Page views
   - Visitantes únicos
   - Top pages
   - Dispositivos
   - Ubicaciones geográficas

## Monitoreo y Performance

En el dashboard de Vercel puedes ver:

- **Speed Insights**: Core Web Vitals (LCP, FID, CLS)
- **Function Logs**: Si usas API routes
- **Build Logs**: Historial de deploys
- **Deployment Status**: Éxito/fallo de cada deploy

## Rollback (volver a versión anterior)

Si algo sale mal:

1. Ve a **Deployments**
2. Encuentra el deployment anterior que funcionaba
3. Haz clic en los 3 puntos **"..."**
4. Selecciona **"Promote to Production"**

## Preview Deployments para testing

Antes de mergear a `main`, puedes crear una branch para testing:

```bash
# Crear branch de feature
git checkout -b feature/nueva-funcionalidad

# Hacer cambios y commit
git add .
git commit -m "Nueva funcionalidad"

# Push a GitHub
git push origin feature/nueva-funcionalidad
```

Vercel automáticamente creará un deployment preview con URL única para que puedas probar antes de mergear.

## Troubleshooting

### Build falla

1. Revisa los logs en Vercel
2. Verifica que `npm run build` funcione localmente
3. Chequea que todas las dependencias estén en `package.json`

### 404 en rutas dinámicas

- Verifica que los archivos estén en las rutas correctas
- Para `/[cliente]/presupuesto`, debe existir `app/[cliente]/presupuesto/page.tsx`

### Variables de entorno no funcionan

- Las variables de entorno deben estar en Vercel Settings
- Deben estar prefijadas con `NEXT_PUBLIC_` para ser accesibles en el cliente
- Requieren re-deploy después de agregar/modificar

## Enlaces útiles

- **Dashboard del proyecto**: https://vercel.com/gparrar0x/sw-website-next
- **Documentación Vercel**: https://vercel.com/docs
- **Next.js on Vercel**: https://vercel.com/docs/frameworks/nextjs
