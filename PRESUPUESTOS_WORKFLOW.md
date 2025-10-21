# Workflow para Crear Nuevos Presupuestos

## Sistema de Presupuestos

Los presupuestos se crean como archivos Markdown con frontmatter (metadata) y se acceden mediante URLs dinámicas.

**Ejemplo de URL:**
- `skywalking.dev/clinica/presupuesto` → lee `/public/presupuestos/clinica.md`
- `skywalking.dev/mi-empresa/presupuesto` → lee `/public/presupuestos/mi-empresa.md`

## Crear un Nuevo Presupuesto

### Paso 1: Crear el archivo Markdown

1. Ve a la carpeta: `/public/presupuestos/`
2. Crea un nuevo archivo: `nombre-cliente.md`
3. El nombre del archivo debe ser el slug que usarás en la URL (sin espacios, todo en minúsculas)

**Ejemplos de nombres:**
- `clinica-san-martin.md` → URL: `/clinica-san-martin/presupuesto`
- `hotel-patagonia.md` → URL: `/hotel-patagonia/presupuesto`
- `estudio-juridico.md` → URL: `/estudio-juridico/presupuesto`

### Paso 2: Estructura del archivo

Copia esta plantilla base:

\`\`\`markdown
---
titulo: "Propuesta [Nombre del Proyecto]"
cliente: "[Nombre del Cliente]"
fecha: "2025-01-20"
total: "USD X,XXX + USD XXX/mes"
contacto: "www.skywalking.dev · info@skywalking.dev"
---

# Propuesta [Nombre del Proyecto]

## 📋 Resumen Ejecutivo

[Breve descripción del proyecto - 2-3 líneas sobre qué problema resuelves y cómo]

---

## 🎯 Objetivos

- **Objetivo 1:** [Descripción]
- **Objetivo 2:** [Descripción]
- **Objetivo 3:** [Descripción]

---

## 🛠️ Solución Propuesta

### Fase 1: [Nombre de la Fase]

[Descripción de qué incluye esta fase]

**Entregables:**
- Item 1
- Item 2
- Item 3

**Duración:** X semanas

### Fase 2: [Nombre de la Fase]

[Descripción]

**Entregables:**
- Item 1
- Item 2

**Duración:** X semanas

---

## 💰 Inversión

| Concepto | Descripción | Costo |
|----------|-------------|-------|
| Setup Inicial | [Descripción] | USD X,XXX |
| Desarrollo | [Descripción] | USD X,XXX |
| **Total One-time** | | **USD X,XXX** |
| Mantenimiento Mensual | Hosting, soporte, actualizaciones | USD XXX/mes |

### Forma de Pago

- **50%** al inicio del proyecto
- **50%** al completar desarrollo

---

## ⏱️ Timeline

```
Semana 1-2: [Fase 1]
Semana 3-4: [Fase 2]
Semana 5-6: Testing y ajustes
Semana 7: Go-live
```

---

## 📦 Incluye

✅ [Item 1]
✅ [Item 2]
✅ [Item 3]
✅ Capacitación del equipo
✅ Documentación completa
✅ Soporte durante implementación

---

## 🚀 Próximos Pasos

1. Revisión de propuesta
2. Reunión de kick-off
3. Inicio de desarrollo

---

## 📞 Contacto

**Skywalking.dev**
San Martín de los Andes, Argentina

📧 info@skywalking.dev
🌐 www.skywalking.dev
💬 WhatsApp: +54 9 11 2162-5416

---

*Propuesta válida por 30 días*
\`\`\`

### Paso 3: Personalizar el presupuesto

Modifica estas secciones según el cliente:

1. **Frontmatter (metadata):**
   - `titulo`: Nombre descriptivo del proyecto
   - `cliente`: Nombre de la empresa/persona
   - `fecha`: Fecha de creación
   - `total`: Resumen del costo (aparece destacado arriba)

2. **Resumen Ejecutivo:**
   - Problema que resuelves
   - Solución en 2-3 líneas

3. **Objetivos:**
   - 3-5 objetivos medibles
   - Usar verbos de acción

4. **Solución Propuesta:**
   - Dividir en fases lógicas
   - Especificar entregables concretos
   - Incluir duración estimada

5. **Inversión:**
   - Desglosar costos claramente
   - Incluir precio mensual si aplica
   - Especificar forma de pago

6. **Timeline:**
   - Cronograma realista
   - Hitos importantes

## Características del Sistema

### Markdown soportado

El sistema usa **react-markdown** con estas extensiones:

#### Headings
```markdown
# H1
## H2
### H3
```

#### Énfasis
```markdown
**negrita**
*itálica*
~~tachado~~
```

#### Listas
```markdown
- Item 1
- Item 2
  - Sub-item
```

```markdown
1. Primero
2. Segundo
3. Tercero
```

#### Tablas
```markdown
| Columna 1 | Columna 2 | Columna 3 |
|-----------|-----------|-----------|
| Dato 1    | Dato 2    | Dato 3    |
```

#### Links
```markdown
[Texto del link](https://ejemplo.com)
```

#### Blockquotes
```markdown
> Esto es una cita importante
```

#### Code blocks
```markdown
\`\`\`javascript
const ejemplo = "código";
\`\`\`
```

#### Checkboxes
```markdown
- [x] Tarea completada
- [ ] Tarea pendiente
```

#### Emojis
```markdown
✅ ❌ 📧 💰 🚀 ⏱️ 📊 🎯
```

### Frontmatter (Metadata)

El frontmatter es obligatorio y debe tener este formato:

```yaml
---
titulo: "Texto del título"
cliente: "Nombre del cliente"
fecha: "YYYY-MM-DD"
total: "Resumen del costo"
contacto: "info@skywalking.dev"
---
```

**Importante:**
- Usa comillas dobles para valores con espacios
- La fecha debe estar en formato ISO (YYYY-MM-DD)
- El contacto puede incluir múltiples medios separados por ·

## Exportar a PDF

Los clientes pueden exportar el presupuesto a PDF haciendo clic en el botón flotante "Exportar PDF" en la esquina inferior derecha.

El PDF incluye:
- Toda la información del presupuesto
- Formato profesional
- Preserva tablas, listas y formato

## Testing Local

Para verificar un presupuesto antes de subir:

1. Crea el archivo en `/public/presupuestos/nombre.md`
2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Abre: `http://localhost:3000/nombre/presupuesto`
4. Verifica formato, ortografía, datos
5. Prueba la exportación a PDF

## Deployment

### Opción 1: Push a GitHub (automático)

```bash
# Agregar el nuevo presupuesto
git add public/presupuestos/nuevo-cliente.md

# Commit
git commit -m "Agregar presupuesto para [Cliente]"

# Push (deploy automático)
git push origin main
```

Vercel detectará el push y automáticamente:
1. Construirá el sitio
2. Generará las rutas estáticas
3. Desplegará a producción

Disponible en ~2 minutos: `skywalking.dev/nuevo-cliente/presupuesto`

### Opción 2: Vercel CLI

```bash
# Deploy directo
vercel --prod
```

## Compartir con Clientes

### Enviar por Email

```
Hola [Nombre],

Te comparto la propuesta para [Proyecto]:

🔗 https://skywalking.dev/nombre-cliente/presupuesto

Podés descargarla en PDF haciendo clic en el botón de la esquina.

¿Cuándo podemos agendar una llamada para revisarla?

Saludos,
[Tu nombre]
```

### Enviar por WhatsApp

```
Hola [Nombre]! 👋

Te paso la propuesta para [Proyecto]:

🔗 skywalking.dev/nombre-cliente/presupuesto

Podés descargarla en PDF si necesitás.

Cuando quieras hablamos! 📞
```

## Tips y Mejores Prácticas

### ✅ DO

- Usa un slug claro y corto (ej: `clinica` en vez de `clinica-san-martin-atencion-pacientes`)
- Incluye emojis para hacer el presupuesto más visual
- Sé específico en entregables y timeline
- Mantén las tablas simples (max 3-4 columnas)
- Prueba la exportación a PDF antes de enviar

### ❌ DON'T

- No uses caracteres especiales en el slug (ñ, á, /, etc)
- No hagas el presupuesto muy largo (max 3-4 páginas en PDF)
- No olvides actualizar la metadata (fecha, total, cliente)
- No uses imágenes pesadas (el PDF las incluye)
- No copies directamente de Word (usa Markdown limpio)

## Plantillas por Tipo de Proyecto

### Bot Conversacional

Ver: `clinica.md` como ejemplo

**Estructura sugerida:**
1. Resumen: Problema de atención al cliente
2. Objetivos: Reducir tiempo de respuesta, automatizar FAQs
3. Solución: Fases de diseño, desarrollo, entrenamiento
4. Inversión: Setup + mensual por mantenimiento
5. ROI esperado

### Automatización de Procesos

**Estructura sugerida:**
1. Resumen: Proceso manual actual
2. Objetivos: Tiempo ahorrado, errores reducidos
3. Solución: Mapeo, integración, automatización
4. Inversión: Por complejidad del proceso
5. Métricas de éxito

### Desarrollo Web

**Estructura sugerida:**
1. Resumen: Necesidad de presencia online
2. Objetivos: Features principales
3. Solución: Diseño, desarrollo, SEO
4. Inversión: Por páginas/funcionalidad
5. Mantenimiento mensual

## Troubleshooting

### El presupuesto no aparece (404)

1. Verifica que el archivo esté en `/public/presupuestos/`
2. Revisa que el nombre del archivo sea correcto (sin .md en la URL)
3. Asegúrate de que el frontmatter sea válido
4. Chequea que el build haya sido exitoso en Vercel

### Error de frontmatter

El frontmatter debe:
- Empezar y terminar con `---`
- Tener todos los campos requeridos
- Usar comillas dobles para valores con espacios
- Estar al inicio del archivo (sin líneas vacías antes)

### PDF se ve mal

1. Evita CSS custom inline
2. Usa Markdown estándar
3. Prueba localmente antes de enviar
4. Las tablas muy anchas pueden cortarse

### Presupuesto desactualizado en producción

1. Verifica que hiciste commit y push
2. Chequea el status del deployment en Vercel
3. Espera ~2 minutos para propagación
4. Limpia caché del navegador (Cmd+Shift+R)
