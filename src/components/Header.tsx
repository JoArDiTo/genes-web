import { Link } from "wouter"
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { UserRole } from "../lib/enum";

export const Header = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error('LoginPage must be used within an AuthProvider');

  const { user } = authContext;


  return (
    <>
      <header className="w-full flex justify-between items-center px-24 py-5">
      <img src="https://colegiogenes.edu.pe/wp-content/uploads/2020/10/logo.svg" alt="Logo de la institución educativa GENES" />
      <nav className="flex gap-10 items-center font-semibold">
        <Link className="text-gray-800 hover:text-red-600 font-medium" href="/">Inicio</Link>
        { user === null && <Link className="text-gray-800 hover:text-red-600 font-medium" href="/iniciar-sesion">Realizar Test</Link> }
        {
          user && 
          <>
            <Link
              className="text-gray-800 hover:text-red-600 font-medium" 
              href={`/${user.role === UserRole.STUDENT ? "cuestionarios" : "evaluaciones"}`}
            >
              { user.role === UserRole.STUDENT ? "Realizar Test" : "Evaluar Test" }
            </Link>
            {
              user.role === UserRole.STUDENT && (
                <Link href="/resultados" className="text-gray-800 hover:text-red-600 font-medium">
                  Ver Resultados
                </Link>
              )
            }
          </>
        }
        <Link 
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-medium transition-colors"
          href={user ? "/perfil" : "/iniciar-sesion"}>
            { user ? 'Mi cuenta' : 'Iniciar sesión' }
        </Link>
      </nav>
    </header>
    <hr />
    </>
  )
}
