'use client'

import React, { useState } from 'react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { track } from '@vercel/analytics'

interface ExportPDFButtonProps {
  filename: string
  elementId: string
}

export default function ExportPDFButton({ filename, elementId }: ExportPDFButtonProps) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExportPDF = async () => {
    setIsExporting(true)

    try {
      const element = document.getElementById(elementId)
      if (!element) {
        console.error('Elemento no encontrado')
        return
      }

      // Capturar el contenido como imagen
      const canvas = await html2canvas(element, {
        scale: 2, // Mayor calidad
        useCORS: true,
        logging: false,
        backgroundColor: '#E8E2CF',
        onclone: (clonedDoc) => {
          // Reemplazar funciones de color modernas con valores RGB compatibles
          const style = clonedDoc.createElement('style')
          style.textContent = `
            * {
              color: rgb(0, 0, 0) !important;
            }
          `
          clonedDoc.head.appendChild(style)
        }
      })

      // Crear PDF
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      const imgWidth = 210 // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      let heightLeft = imgHeight
      let position = 0

      // Agregar primera página
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= 297 // A4 height in mm

      // Agregar páginas adicionales si es necesario
      while (heightLeft > 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= 297
      }

      // Descargar
      pdf.save(`${filename}.pdf`)

      // Track event (Vercel Analytics)
      track('PDF Exported', { filename })
    } catch (error) {
      console.error('Error al exportar PDF:', error)
      alert('Hubo un error al generar el PDF. Por favor intenta nuevamente.')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <button
      onClick={handleExportPDF}
      disabled={isExporting}
      className="fixed bottom-8 right-8 bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white font-bold py-4 px-8 rounded-xl shadow-2xl transition-all duration-200 flex items-center gap-3 z-50 text-lg hover:scale-105 active:scale-95"
    >
      {isExporting ? (
        <>
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Generando...
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Exportar PDF
        </>
      )}
    </button>
  )
}
