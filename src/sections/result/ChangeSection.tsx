import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { UserRole } from "../../lib/enum";

export interface Props {
  setCurrentSection: (section: 'answers' | 'observations' | 'ai') => void;
  currentSection: 'answers' | 'observations' | 'ai';
}

export const ChangeSection = ({ setCurrentSection, currentSection }: Props) => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error('LoginPage must be used within an AuthProvider');
  
  const { user } = authContext;

  return (
    <nav className="mb-4">
      <button
        onClick={() => setCurrentSection('answers')}
        className={`py-2 px-4 font-medium ${currentSection === 'answers' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
      >
        Resultados
      </button>
      <button
        onClick={() => setCurrentSection('observations')}
        className={`py-2 px-4 font-medium ${currentSection === 'observations' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
      >
        Observaciones
      </button>
      {user?.role === UserRole.TEACHER && (
        
        <button
          onClick={() => setCurrentSection('ai')}
          className={`py-2 px-4 font-medium ${currentSection === 'ai' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
        >
         Ayuda con la IA
        </button>
      )}
    </nav>
  )
}