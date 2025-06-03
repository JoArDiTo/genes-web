import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import type { TestPerformedSelected } from "../../interfaces/TestPerformedSelected";
import { UserRole } from "../../lib/enum";

export const TestPerformedDetail = ({ resultData }: { resultData: TestPerformedSelected }) => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error('LoginPage must be used within an AuthProvider');

  const { user } = authContext;

  return (
    <header className="mb-6">
      <h2 className="text-xl font-semibold">{resultData.templateTest.name}</h2>
      <p className="text-gray-600">{resultData.templateTest.description}</p>
      <p className="mt-1 text-xs text-gray-400">Realizado el: {new Date(resultData.createdAt).toLocaleString()}</p>
      {
        user?.role === UserRole.TEACHER && (
          <>
            <p className="mt-2">Puntaje: <span className="font-bold">{resultData.score}</span></p>
            <p className="mt-1 text-sm text-gray-500">Interpretación: {resultData.interpretation}</p>
          </>
        )
      }
    </header>
  )
}