import { useContext } from "react";
import { UserRole } from "../../lib/enum"
import { AuthContext } from "../../contexts/AuthContext";


export const MainSection = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error('Header must be used within an AuthProvider');
      
  const { user } = authContext

  return (
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
  )
}