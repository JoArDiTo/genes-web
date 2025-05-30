import { Redirect, useRoute } from "wouter";
import { MainLayout } from "../layouts/MainLayout"
import useFetch from "../hooks/useFetch";
import type { TestPerformedSelected } from "../interfaces/TestPerformedSelected";
import { getTestPerformedById } from "../lib/api";
import { ArrowUpIcon } from "../icons/ArrowUp";

export const ResultSelectedPage = () => {
  const [match, params] = useRoute("/resultados/:id");
  if (!match) return <Redirect to="/resultados" />

  const {
    data: resultData,
    loading: resultLoading,
    error: resultError,
  } = useFetch<TestPerformedSelected>(() => getTestPerformedById(params.id));

  return (
    <MainLayout>
      <section className="relative container mx-auto p-4">
        <a href="/resultados" className="cursor-pointer absolute right-5 bg-red-500 text-white px-4 py-2 rounded mb-4 hover:bg-red-600 hover:scale-110 transition">
          Volver
        </a>
        <h1 className="text-2xl font-bold">Resultados</h1>
        {resultLoading && <p>Cargando...</p>}
        {resultError && <p className="text-red-500">Error al cargar los resultados.</p>}
        {resultData && (
          <div className="mt-4">
            <header className="mb-6">
              <h2 className="text-xl font-semibold">{resultData.templateTest.name}</h2>
              <p className="text-gray-600">{resultData.templateTest.description}</p>
              <p className="mt-2">Puntaje: <span className="font-bold">{resultData.score}</span></p>
              <p className="mt-1 text-sm text-gray-500">Interpretación: {resultData.interpretation}</p>
              <p className="mt-1 text-xs text-gray-400">Realizado el: {new Date(resultData.createdAt).toLocaleString()}</p>
            </header>
            <main>
              <h3 className="text-lg font-semibold mb-2">Preguntas y respuestas:</h3>
              <ul className="space-y-4">
                {resultData.answers.map((answer, idx) => (
                  <li key={idx} className="border rounded p-3">
                    <p className="font-medium">{idx + 1}. {answer.question}</p>
                    <p className="ml-2">Respuesta marcada: <span className="font-semibold">{answer.alternative}</span> <span className="text-xs text-gray-500">(Valor: {answer.value})</span></p>
                  </li>
                ))}
              </ul>
            </main>
          </div>
        )}
      </section>
      <a className="fixed aspect-square bg-sky-300 p-3 rounded-lg left-5 bottom-5 transition hover:scale-110" href="#top">
        <ArrowUpIcon />
      </a>
    </MainLayout>
  )
}