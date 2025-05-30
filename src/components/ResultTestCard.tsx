import { Link } from "wouter"
import type { TestPerformed } from "../interfaces/TestPerfomed"
import { NoteIcon } from "../icons/Note"

export const TestPerformedCard = (test: TestPerformed) => {
  const { id, templateTest, createdAt, score } = test

  return (
    <Link href={`/resultados/${id}`} key={id} className="w-full max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
      <article className="w-full flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold"><NoteIcon/> {templateTest}</h2>
        <p className="text-gray-500">Fecha: {new Date(createdAt).toLocaleDateString()}</p>
        <p className="text-gray-500">Resultado: {score}</p>
      </article>
    </Link>
  ) 
}