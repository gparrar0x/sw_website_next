# Skywalking.dev - Website & Budget Presentation System

> Website corporativo de Skywalking.dev con sistema de presentación de presupuestos

## 🚀 Stack Tecnológico

- **Framework:** Next.js 15 (App Router + Turbopack)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS + CSS custom
- **Fuente:** JetBrains Mono
- **Markdown:** react-markdown + gray-matter + remark-gfm
- **PDF Export:** html2canvas + jsPDF
- **Analytics:** Vercel Analytics
- **Deployment:** Vercel
- **Integración:** Google Sheets (via Apps Script)

## 📋 Características

### Website Principal (/)

- Hero section con animaciones de gradientes flotantes
- Efecto de typing en el título
- Parallax en scroll
- Secciones: Servicios, Cómo Trabajamos, Por Qué Elegirnos
- Formulario de contacto integrado con Google Sheets
- Botón flotante de WhatsApp
- Animaciones de scroll en tarjetas de servicios

### Sistema de Presupuestos (/[cliente]/presupuesto)

- Rutas dinámicas generadas estáticamente
- Presupuestos escritos en Markdown con frontmatter
- Renderizado con sintaxis completa (tablas, listas, code blocks, etc.)
- Exportación a PDF con un clic
- Tracking de eventos con Vercel Analytics
- Diseño profesional con colores de marca

## 🎨 Paleta de Colores

```css
--bg-primary: #000000      /* Fondo principal */
--bg-secondary: #E8E2CF    /* Fondo presupuestos */
--bg-card: #EFEEE9         /* Cards y contenido */
--text-primary: #000000    /* Texto principal */
--text-inverse: #FFFFFF    /* Texto sobre negro */
--accent-1: #E8E2CF        /* Acento primario */
--accent-2: #EFEEE9        /* Acento secundario */
```

## 🛠️ Setup Local

### Prerequisitos

- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/gparrar0x/sw_website_next.git
cd sw_website_next

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build para producción

```bash
# Generar build optimizado
npm run build

# Iniciar servidor de producción
npm start
```

## 📁 Estructura del Proyecto

```
sw_website_next/
├── app/
│   ├── [cliente]/presupuesto/   # Rutas dinámicas de presupuestos
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Layout principal
│   └── globals.css               # Estilos globales
├── components/
│   ├── presupuesto/
│   │   ├── presupuesto-viewer.tsx    # Renderizador de presupuestos
│   │   └── export-pdf-button.tsx     # Botón exportar PDF
│   ├── contact-form.tsx              # Formulario de contacto
│   ├── whatsapp-button.tsx           # Botón flotante WhatsApp
│   └── hero-animations.tsx           # Animaciones del hero
├── lib/
│   └── presupuestos.ts               # Utilidades para leer presupuestos
├── public/
│   └── presupuestos/                 # Archivos .md de presupuestos
│       └── clinica.md                # Ejemplo: /clinica/presupuesto
├── docs/
│   └── templates/
│       └── ejemplo_presupuesto.md    # Template de referencia
├── PRESUPUESTOS_WORKFLOW.md          # Guía para crear presupuestos
├── VERCEL_DEPLOYMENT.md              # Guía de deployment
├── GODADDY_DNS_SETUP.md              # Configuración DNS con GoDaddy API
├── GOOGLE_SHEETS_SETUP.md            # Configuración Google Sheets
└── README.md                         # Este archivo
```

## 📝 Crear un Nuevo Presupuesto

**Ver guía completa:** [PRESUPUESTOS_WORKFLOW.md](./PRESUPUESTOS_WORKFLOW.md)

### Quick Start

1. Crear archivo en `/public/presupuestos/nombre-cliente.md`
2. Copiar template con frontmatter:

```markdown
---
titulo: "Propuesta [Nombre del Proyecto]"
cliente: "[Nombre del Cliente]"
fecha: "2025-01-20"
total: "USD X,XXX + USD XXX/mes"
contacto: "www.skywalking.dev · info@skywalking.dev"
---

# Propuesta [Nombre del Proyecto]

## 📋 Resumen Ejecutivo
...
```

3. URL será: `skywalking.dev/nombre-cliente/presupuesto`

## 🚀 Deployment a Vercel

**Ver guía completa:** [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

### Deployments Automáticos

El proyecto está conectado a GitHub para deployments automáticos:

- **Push a `main`** → Deploy a producción (skywalking.dev)
- **Pull Requests** → Deploy preview con URL única
- **Otras branches** → Deploy preview

### Deploy Manual

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy a producción
vercel --prod
```

## 🌐 Configuración DNS (GoDaddy)

**Ver guía completa:** [GODADDY_DNS_SETUP.md](./GODADDY_DNS_SETUP.md)

Para configurar tu dominio de GoDaddy automáticamente:

1. Crea archivo `.env` con tus credenciales de GoDaddy API
2. Ejecuta: `node scripts/configure_godaddy_dns.js`
3. Espera propagación DNS (5-30 minutos)
4. Agrega el dominio en Vercel Dashboard

## 📧 Configuración Google Sheets

**Ver guía completa:** [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)

El formulario de contacto envía datos a Google Sheets mediante Google Apps Script.

**URL del Script:** Configurada en `components/contact-form.tsx`

## 📞 Contacto

**WhatsApp:** +54 9 11 2162-5416
**Email:** info@skywalking.dev
**Website:** www.skywalking.dev
**Ubicación:** San Martín de los Andes, Argentina

## 🔗 Enlaces

- **Repositorio GitHub:** https://github.com/gparrar0x/sw_website_next
- **Sitio Web:** https://skywalking.dev
- **Vercel Dashboard:** https://vercel.com/gparrar0x/sw-website-next
- **Google Sheets:** [Hoja de contactos](https://docs.google.com/spreadsheets/d/1dFrnhv-WnwnSnqYKUX3L0DJIq3c-XSRqMDSRStQU6rc/edit)

## 📄 Licencia

© 2025 Skywalking.dev - Todos los derechos reservados
