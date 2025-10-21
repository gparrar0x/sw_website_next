import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#E8E2CF' }}>
      <div className="max-w-md mx-auto px-6 text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-6xl mb-4">📄</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Presupuesto no encontrado</h1>
          <p className="text-gray-600 mb-6">
            El presupuesto que estás buscando no existe o ha sido eliminado.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Volver al inicio
          </Link>
          <p className="text-sm text-gray-500 mt-6">
            Si crees que esto es un error, contáctanos en{' '}
            <a href="mailto:hola@skywalking.dev" className="text-blue-600 hover:underline">
              hola@skywalking.dev
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
