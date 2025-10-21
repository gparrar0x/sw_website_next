'use client'

import { useState } from 'react'
import { track } from '@vercel/analytics'

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      nombre: formData.get('nombre'),
      email: formData.get('email'),
      whatsapp: formData.get('whatsapp'),
      proceso: formData.get('proceso'),
      descripcion: formData.get('descripcion')
    }

    try {
      // IMPORTANTE: Esta NO es la URL correcta. Debes obtener la URL de implementación web
      // Sigue estos pasos:
      // 1. En Apps Script, haz clic en "Implementar" → "Nueva implementación"
      // 2. Tipo: "Aplicación web"
      // 3. Ejecutar como: Tu cuenta
      // 4. Quién tiene acceso: "Cualquier persona"
      // 5. Copia la URL que termina en /exec (no la del editor)
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwklQhfuyPaKy3BZyimIlwGfKWlLQIqdoew7C90c-zNQXFuxaNBmqyEMLaI6zpapgsk/exec'

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Necesario para Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      // Con mode: 'no-cors', no podemos leer la respuesta, pero si llega aquí es porque se envió
      setSubmitStatus('success')
      track('Contact Form Submitted', { proceso: data.proceso as string })

      // Resetear el formulario
      if (form) {
        form.reset()
      }

      // Limpiar mensaje después de 5 segundos
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)

    } catch (error) {
      console.error('Error al enviar formulario:', error)
      setSubmitStatus('error')

      // Limpiar mensaje después de 5 segundos
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="sw-contact-form-wrapper">
      <form className="sw-contact-form" onSubmit={handleSubmit}>
        <div className="sw-form-group">
          <label htmlFor="nombre">Nombre completo</label>
          <input type="text" id="nombre" name="nombre" required />
        </div>
        <div className="sw-form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="sw-form-group">
          <label htmlFor="whatsapp">WhatsApp (con código de país)</label>
          <input type="tel" id="whatsapp" name="whatsapp" placeholder="+54 9 11 1234-5678" required />
        </div>
        <div className="sw-form-group">
          <label htmlFor="proceso">¿Qué proceso te gustaría automatizar?</label>
          <select id="proceso" name="proceso" required>
            <option value="">Selecciona una opción</option>
            <option value="atencion-cliente">Atención al cliente</option>
            <option value="ventas">Pipeline de ventas</option>
            <option value="marketing">Marketing automation</option>
            <option value="operaciones">Procesos operativos</option>
            <option value="reportes">Reportes y dashboards</option>
            <option value="otro">Otro</option>
          </select>
        </div>
        <div className="sw-form-group">
          <label htmlFor="descripcion">Cuéntanos más sobre tu desafío</label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows={4}
            placeholder="Describe brevemente el proceso que quieres automatizar y cuál es tu principal dolor actual..."
          ></textarea>
        </div>

        <button type="submit" className="sw-btn-primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <svg className="sw-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enviando...
            </>
          ) : (
            <>
              Agendar Consulta Gratuita
              <span className="sw-btn-arrow">→</span>
            </>
          )}
        </button>

        {submitStatus === 'success' && (
          <div className="sw-form-message sw-form-success">
            ✓ ¡Mensaje enviado! Te contactaremos pronto.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="sw-form-message sw-form-error">
            ✗ Hubo un error. Por favor intenta nuevamente.
          </div>
        )}
      </form>
    </div>
  )
}
