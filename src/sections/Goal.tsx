import { GroupIcon } from "../icons/Group"
import { HearthIcon } from "../icons/Hearth"
import { NoteIcon } from "../icons/Note"

export const GoalSection = () => {
  return (
    <section id="objetivos" className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Nuestro Objetivo</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  El Sistema de Apoyo a la Salud Mental del Colegio GENES está diseñado para identificar, evaluar y apoyar a
                  los estudiantes en su bienestar emocional, proporcionando herramientas tanto a estudiantes como a docentes
                  para un desarrollo integral.
                </p>
              </div>
    
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <HearthIcon/>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Bienestar Emocional</h3>
                  <p className="text-gray-600">
                    Promovemos el bienestar emocional de nuestros estudiantes mediante evaluaciones periódicas y seguimiento
                    personalizado.
                  </p>
                </div>
    
                <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <NoteIcon />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Evaluación Continua</h3>
                  <p className="text-gray-600">
                    Realizamos cuestionarios diseñados por profesionales para detectar tempranamente posibles problemas de
                    salud mental.
                  </p>
                </div>
    
                <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <GroupIcon />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Apoyo Integral</h3>
                  <p className="text-gray-600">
                    Involucramos a toda la comunidad educativa en el proceso de apoyo y seguimiento para garantizar
                    resultados efectivos.
                  </p>
                </div>
              </div>
            </div>
          </section>
  )
}