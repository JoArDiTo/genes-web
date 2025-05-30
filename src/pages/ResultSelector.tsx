import { useContext } from "react";
import useFetch from "../hooks/useFetch"
import type { TestPerformed } from "../interfaces/TestPerfomed";
import { MainLayout } from "../layouts/MainLayout"
import { AuthContext } from "../contexts/AuthContext";
import { getTestsPerformed } from "../lib/api";
import { TestPerformedCard } from "../components/ResultTestCard";
import { SelectorContainer } from "../components/SelectorContainer";

export const ResultSelectorPage = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error('La página debe utilizarse dentro de un AuthProvider');

  const { user } = authContext;
  if (!user) throw new Error('No se encontró el usuario');

  const {
     data: testsPerformedData,
     loading: testsPerformedLoading,
     error: testsPerformedError,
   } = useFetch<TestPerformed[]>(() => getTestsPerformed(user?.id));

  return (
    <MainLayout>
      <SelectorContainer>
        <h1 className="text-2xl font-bold mb-5">Resultados</h1>
        {
          testsPerformedLoading
          ? (
            <div className="flex items-center justify-center w-full h-full py-10">
              <span className="loader">Cargando datos...</span>
            </div>
          )
          : testsPerformedError
          ? (
            <div className="flex items-center justify-center w-full h-full py-10">
              <p className="text-red-500">Ocurrió un error al cargar el perfil.</p>
            </div>
          )
          : testsPerformedData && (
            <div className="flex flex-wrap justify-center gap-5">
              {
                testsPerformedData.map((test) => (
                 <TestPerformedCard key={test.id} {...test} />
                ))
              }
            </div>
          )
        }
      </SelectorContainer>
    </MainLayout>
  )
}