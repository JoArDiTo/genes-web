import type { TestPerformed } from "../interfaces/TestPerfomed"
import { NoteIcon } from "../icons/Note"
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { UserRole } from "../lib/enum";

export const TestPerformedCard = ({ test }: { test:TestPerformed }) => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error('LoginPage must be used within an AuthProvider');

  const { user } = authContext;
  const { templateTest, createdAt, score } = test

  return (
    <article className="block w-full max-w-md p-4 sm:p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 transition-colors">
      <p className="mb-2 text-xl sm:text-2xl font-semibold tracking-tight text-gray-900 flex items-center gap-2">
        <NoteIcon /> {templateTest}
      </p>
      <div className="flex justify-between">
        <p className="font-semibold">Fecha: {new Date(createdAt).toLocaleDateString()}</p>
        { user?.role === UserRole.TEACHER && <p className="text-gray-500">Resultado: {score}</p> }
      </div>
    </article>
  ) 
}