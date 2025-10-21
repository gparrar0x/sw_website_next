---
titulo: "Propuesta Bot Clínica San Martín"
cliente: "Clínica San Martín"
fecha: "2025-01-20"
total: "USD 1,800 + USD 300/mes"
contacto: "www.skywalking.dev · hola@skywalking.dev"
---

## Etapa 1 – Alcance

**Bot integrado en la web y a WhatsApp**

- Detectar la fuente que originó la conversación, principalmente en la web
- Integración con n8n (instalado en servidor propio o en nube)
- Conexión con Supabase como base de datos central
- Integración con sistema de gestión clínica para:
  - Obtener disponibilidad de profesionales
  - Filtrar especialidades según necesidades del paciente
  - Capacidad de IA para interpretar síntomas y sugerir especialistas adecuados
- Diseño de flujo conversacional y prompts para guiar a conversión
- Integración con calendario Google/Microsoft para agendamiento con médicos

---

## Objetivo del Proyecto

Diseñar, implementar y mantener un asistente virtual con Inteligencia Artificial para la Clínica San Martín, que automatice la atención de pacientes a través de WhatsApp.

**El bot será capaz de:**

- Responder consultas 24/7
- Sugerir especialistas según síntomas del paciente
- Integrarse con sistema de gestión para obtener disponibilidad actualizada
- Centralizar datos en Supabase como base de datos intermedia
- Agendar citas directamente en los calendarios de los médicos
- Realizar seguimientos automáticos de recordatorios de citas

---

## Desarrollo Inicial

### Implementación técnica

- Instalación y configuración de servidor n8n
- Integración con WhatsApp Business API
- Base de datos en Supabase para almacenar pacientes y citas
- Conexión con sistema de gestión clínica
- Sincronización con calendarios de cada médico

### Diseño de flujo conversacional

- Preguntas clave para calificar al paciente: síntomas, urgencia, especialidad, horarios preferidos
- Respuestas automáticas personalizadas con disponibilidad de médicos
- Opciones de agenda directa con especialista disponible
- Seguimientos automáticos vía WhatsApp para recordatorios

### Entrenamiento del Bot (IA)

- Capacidad de procesar lenguaje natural para entender síntomas (ej: "Tengo dolor de cabeza fuerte hace 3 días")
- Filtrado de especialistas relevantes según síntomas
- Manejo de emergencias y derivación urgente

---

## Beneficios para Clínica San Martín

- **Ahorro de tiempo:** El bot filtra y precalifica pacientes antes de derivarlos
- **Respuesta inmediata 24/7:** Incluso fuera del horario de atención
- **Mayor conversión:** Seguimiento automático de pacientes que no concretaron cita
- **Centralización de datos:** Análisis y reportes en Supabase
- **Imagen innovadora:** Primera clínica de la región con asistente virtual propio

---

## Inversión

### Setup inicial (Etapa 1)

- Desarrollo e integraciones: **USD 1,200**
- Diseño de flujo conversacional + IA: **USD 300**
- Implementación y pruebas: **USD 300**

**Total Setup Único: USD 1,800**

### Mantenimiento mensual

**Incluye:**

- Hosting y servidor n8n
- Licencias WhatsApp API (no incluye costo de conversación)
- Soporte y actualizaciones de integraciones
- Optimización mensual del flujo conversacional y reportes

**Fee mensual: USD 300**

### Costos que abona el cliente

- Los tokens de IA de ChatGPT/Claude
- La integración con WhatsApp API conlleva un costo mínimo por mensaje entregado, estimado en USD 0,0618 por mensaje (API original de Meta)

---

## Plazos de Entrega

- Kickoff & Setup técnico: **2 semanas**
- Integraciones y flujo conversacional: **3 semanas**
- Pruebas y ajustes finales: **3 semanas**

**Duración estimada Etapa 1: 8 semanas**

---

## Modalidad de pago sugerida – Etapa Inicial

### Adelanto (50%) – USD 900

- Se abona al aprobar la propuesta y antes de iniciar el desarrollo
- Cubre instalación del servidor n8n, WhatsApp API y configuración base

### Segundo pago (50%) – USD 900

- Al finalizar las integraciones principales y entregar el bot funcionando en producción
