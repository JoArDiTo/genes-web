import { BulbIcon } from "../../icons/Bulb"

export const BenefitSection = () => {
  return (
    <section id="beneficios" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Beneficios del Sistema</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Nuestro enfoque innovador ofrece múltiples ventajas para toda la comunidad educativa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 border border-gray-200 rounded-xl hover:border-blue-500 transition-colors">
            <div className="mb-4">
              <BulbIcon />
            </div>
            <h3 className="text-lg font-semibold mb-2">Detección Temprana</h3>
            <p className="text-gray-600">
              Identificamos señales de alerta temprana para intervenir antes de que los problemas se agraven.
            </p>
          </div>

          <div className="p-6 border border-gray-200 rounded-xl hover:border-blue-500 transition-colors">
            <div className="mb-4">
              <BulbIcon />
            </div>
            <h3 className="text-lg font-semibold mb-2">Enfoque Personalizado</h3>
            <p className="text-gray-600">Cada estudiante recibe atención adaptada a sus necesidades específicas.</p>
          </div>

          <div className="p-6 border border-gray-200 rounded-xl hover:border-blue-500 transition-colors">
            <div className="mb-4">
              <BulbIcon />
            </div>
            <h3 className="text-lg font-semibold mb-2">Análisis Avanzado</h3>
            <p className="text-gray-600">
              La IA proporciona insights que podrían no ser evidentes mediante métodos tradicionales.
            </p>
          </div>

          <div className="p-6 border border-gray-200 rounded-xl hover:border-blue-500 transition-colors">
            <div className="mb-4">
              <BulbIcon />
            </div>
            <h3 className="text-lg font-semibold mb-2">Seguimiento Continuo</h3>
            <p className="text-gray-600">
              Monitoreo constante del progreso para asegurar mejoras sostenibles en el tiempo.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}