'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

interface PresupuestoMetadata {
  titulo: string
  cliente: string
  fecha: string
  total: string
  contacto: string
}

interface PresupuestoViewerProps {
  content: string
  metadata: PresupuestoMetadata
}

export default function PresupuestoViewer({ content, metadata }: PresupuestoViewerProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E8E2CF' }}>
      {/* Header con metadata */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="rounded-lg shadow-sm p-8 mb-6" style={{ backgroundColor: '#EFEEE9' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{metadata.titulo}</h1>
              <p className="text-lg text-gray-600 mt-1">{metadata.cliente}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Fecha: {metadata.fecha}</p>
              <p className="text-xl font-bold text-blue-600 mt-1">{metadata.total}</p>
            </div>
          </div>
          <div className="border-t pt-4 mt-4">
            <p className="text-sm text-gray-600">{metadata.contacto}</p>
          </div>
        </div>

        {/* Contenido markdown */}
        <div className="rounded-lg shadow-sm p-8" style={{ backgroundColor: '#EFEEE9' }}>
          <article className="markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {content}
            </ReactMarkdown>
          </article>
        </div>

        {/* Footer con contacto */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Para cualquier consulta sobre esta propuesta, contáctanos en{' '}
            <a href="mailto:hola@skywalking.dev" className="text-blue-600 hover:underline">
              hola@skywalking.dev
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
