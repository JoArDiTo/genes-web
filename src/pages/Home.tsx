import { MainLayout } from "../layouts/MainLayout"
import { HearthIcon } from "../icons/Hearth"
import { NoteIcon } from "../icons/Note"
import { GroupIcon } from "../icons/Group"
import { BulbIcon } from "../icons/Bulb"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { UserRole } from "../lib/enum"

export const HomePage = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error('Header must be used within an AuthProvider');
    
  const { user } = authContext

  return (
    <MainLayout>
       {/* Presentación */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Sistema de Apoyo a la Salud Mental</h1>
              <p className="text-xl mb-8">Cuidando el bienestar emocional de nuestra comunidad educativa</p>
              <div className="flex flex-col sm:flex-row gap-4">
                {
                  user ? (
                    user.role === UserRole.STUDENT && (
                      <a 
                        href="/cuestionarios" 
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        Realizar Test
                      </a>
                    )
                  ) : (
                    <a 
                      href="/iniciar-sesion" 
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                     Iniciar Sesion
                    </a>
                  )
                }
                <a href="#objetivos" className="bg-white hover:bg-gray-100 text-blue-700 px-6 py-3 rounded-lg font-medium transition-colors">
                  Conocer más
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img src="/images/home.webp" alt="Salud Mental Ilustración" className="max-w-full h-auto rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

       {/* Objetivo Section */}
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

       {/* Cómo Funciona Section */}
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

      {/* Beneficios Section */}
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

      {/* CTA Section */}
      <section id="cta"  className="py-16 bg-gradient-to-r from-blue-700 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Comienza a utilizar nuestro sistema hoy</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Únete a nuestra comunidad comprometida con el bienestar emocional y mental de nuestros estudiantes.
          </p>
          
          {
            user ? (
              user.role === UserRole.STUDENT && (
                <a 
                  href="/cuestionarios" 
                  className="bg-white hover:bg-gray-100 text-blue-700 px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  Realizar Test
                </a>
              )
            ) : (
              <a 
                href="/iniciar-sesion" 
                className="bg-white hover:bg-gray-100 text-blue-700 px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Iniciar Sesion
              </a>
            )
          }
        </div>
      </section>
    </MainLayout>
  )
}