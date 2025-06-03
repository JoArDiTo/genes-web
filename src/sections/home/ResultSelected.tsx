import { Redirect, useRoute } from "wouter";
import { MainLayout } from "../../layouts/MainLayout"
import useFetch from "../../hooks/useFetch";
import type { TestPerformedSelected } from "../../interfaces/TestPerformedSelected";
import { getTestPerformedById } from "../../lib/api";
import { ArrowUpIcon } from "../../icons/ArrowUp";
import Loading from "../../components/Loading";
import ErrorContent from "../../components/Error";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { UserRole } from "../../lib/enum";
import { TestPerformedDetail } from "../result/TestPerformedDetail";
import { ChangeSection } from "../result/ChangeSection";
import { AnswersSection } from "../result/AnswersSection";
import { ObservationSection } from "../result/ObservationSection";
import { GeminiInteractionSection } from "../result/GeminiInteractionSection";

export const ResultSelectedPage = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error('LoginPage must be used within an AuthProvider');

  const { user } = authContext;
  const [match, params] = useRoute("/resultados/:id");
  if (!match) return <Redirect to="/resultados" />

  const {
    data: resultData,
    loading: resultLoading,
    error: resultError,
  } = useFetch<TestPerformedSelected>(() => getTestPerformedById(params.id));

  const [currentSection, setCurrentSection] = useState<'answers' | 'observations' | 'ai'>('answers');

  return (
    <MainLayout>
      <section className="relative container mx-auto p-4">
        {
          user?.role === UserRole.TEACHER 
          ? <button onClick={() => history.back()} className="cursor-pointer absolute right-5 bg-red-500 text-white px-4 py-2 rounded mb-4 hover:bg-red-600 hover:scale-110 transition">Volver</button>
          : <a href="/resultados" className="cursor-pointer absolute right-5 bg-red-500 text-white px-4 py-2 rounded mb-4 hover:bg-red-600 hover:scale-110 transition">Volver</a>
        }
        <h1 className="text-2xl font-bold">Resultados</h1>
        {resultLoading && <Loading />}
        {resultError && <ErrorContent />}
        {!resultLoading && !resultError && resultData && (
          <div className="mt-4">
            <TestPerformedDetail resultData={resultData} />

            {/* Navigation Tabs */}
            <ChangeSection setCurrentSection={setCurrentSection} currentSection={currentSection} />

            <main>
              {currentSection === 'answers' && <AnswersSection resultData={resultData} /> }
              {currentSection === 'observations' && <ObservationSection /> }
              {currentSection === 'ai' && user?.role === UserRole.TEACHER && <GeminiInteractionSection /> }
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