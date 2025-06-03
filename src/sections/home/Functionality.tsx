export const FunctionalitySection = () => {
  return (
    <section id="como-funciona" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">¿Cómo Funciona?</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Nuestro sistema utiliza un enfoque integral que combina cuestionarios especializados con análisis avanzado
            para proporcionar el mejor apoyo posible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-8">
              <div className="flex items-start mb-4">
                <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Cuestionarios para Estudiantes</h3>
                  <p className="text-gray-600">
                    Los estudiantes completan cuestionarios periódicos diseñados para evaluar diferentes aspectos de
                    su salud mental y bienestar emocional.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-start mb-4">
                <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Evaluación por Docentes</h3>
                  <p className="text-gray-600">
                    Los docentes revisan los resultados y proporcionan su perspectiva profesional basada en la
                    observación diaria del estudiante.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start">
                <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Análisis con IA</h3>
                  <p className="text-gray-600">
                    Nuestra inteligencia artificial analiza los datos para identificar patrones y proporcionar
                    recomendaciones personalizadas para cada estudiante.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src="/images/home2.webp"
              alt="Proceso del Sistema"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}