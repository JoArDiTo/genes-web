import { useContext } from "react";
import useFetch from "../hooks/useFetch"
import type { TestPerformed } from "../interfaces/TestPerfomed";
import { MainLayout } from "../layouts/MainLayout"
import { AuthContext } from "../contexts/AuthContext";
import { getTestsPerformed } from "../lib/api";
import { TestPerformedCard } from "../components/ResultTestCard";
import { SelectorContainer } from "../components/SelectorContainer";
import Loading from "../components/Loading";
import ErrorContent from "../components/Error";
import { Link } from "wouter";

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
        {testsPerformedLoading && <Loading />}
        {testsPerformedError && <ErrorContent />}
        {!testsPerformedLoading && !testsPerformedError && testsPerformedData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
            {
              testsPerformedData.map((test) => (
                <Link key={test.id} href={`/resultados/${test.id}`}>	
                  <TestPerformedCard test={test} />
                </Link>
              ))
            }
          </div>
        )}
      </SelectorContainer>
    </MainLayout>
  )
}