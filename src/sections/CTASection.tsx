import { useContext } from "react";
import { UserRole } from "../lib/enum"
import { AuthContext } from "../contexts/AuthContext";

export const CtaSection = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error('Header must be used within an AuthProvider');
    
  const { user } = authContext
  
  return (
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
  )
}