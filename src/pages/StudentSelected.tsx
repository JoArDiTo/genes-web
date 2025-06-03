import { Link, Redirect, useRoute } from "wouter";
import useFetch from "../hooks/useFetch";
import type { StudentResponse } from "../interfaces/Student";
import { getStudentById, getTestsPerformed } from "../lib/api";
import type { TestPerformed } from "../interfaces/TestPerfomed";
import { MainLayout } from "../layouts/MainLayout";
import Loading from "../components/Loading";
import ErrorContent from "../components/Error";
import { TestPerformedCard } from "../components/ResultTestCard";

export const StudentSelected = () => {
  const [match, params] = useRoute("/evaluaciones/estudiante/:id");
  if (!match) return <Redirect to="/resultados" />

  const {
    data: resultData,
    loading: resultLoading,
    error: resultError,
  } = useFetch<StudentResponse>(() => getStudentById(params.id));

  const {
    data: testsPerformedData,
    loading: testsPerformedLoading,
    error: testsPerformedError,
  } = useFetch<TestPerformed[]>(() => getTestsPerformed(params.id));
  
  return (
    <MainLayout>
      <div className="p-3 flex justify-between gap-3 flex-col md:flex-row">
        <section className="py-8 px-16 border rounded-lg flex flex-col items-center [&>h2]:self-start [&>p]:self-start [&>p]:pb-3">
          {resultLoading && <Loading /> }
          {resultError && <ErrorContent />}
          {!resultLoading && !resultError && resultData && (
            <>
              <img className="size-40" src={resultData.user.imageUrl} alt={`Imagen del estudiante ${resultData.user.firstname} ${resultData.user.lastname}`} />
              <h2 className="mt-2 mb-1 text-lg font-semibold w-full border-b-2">Información personal</h2>
              <p><strong>Nombre(s):</strong> {resultData.user.firstname}</p>
              <p><strong>Apellido(s):</strong> {resultData.user.lastname}</p>
              <p><strong>DNI:</strong> {resultData.user.documentId}</p>
              <p><strong>Email:</strong> {resultData.user.email}</p>
              <p><strong>Teléfono:</strong> {resultData.user.phoneNumber}</p>
              <p><strong>Edad:</strong> {resultData.user.age}</p>
              <p><strong>Género:</strong> {resultData.user.gender.toUpperCase()}</p>

              <h2 className="mt-2 mb-1 text-lg font-semibold w-full border-b-2">Información Académica</h2>  
              <p><strong>Grado:</strong> {resultData.student.grade}</p>
              <p><strong>Sección:</strong> {resultData.student.section}</p>
              <p><strong>Promedio:</strong> {resultData.student.level}</p>
            </>
          )}
        </section>
        <section className="flex-1 px-5 py-10 flex flex-col">
          {testsPerformedLoading && <Loading />}
          {testsPerformedError && <ErrorContent />}
          {!testsPerformedLoading && !testsPerformedError && testsPerformedData && (
            <>
               <h1 className="text-2xl font-bold mb-5">Test Realizados</h1>
              {
                testsPerformedData.length > 0
                ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
                    {testsPerformedData.map(test => (
                      <Link key={test.id} href={`../../resultados/${test.id}`}>
                        <TestPerformedCard test={test} />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <h1>Este estudiante no realizó ningún test</h1>
                )
              }
            </>
          )}
        </section>
      </div>
    </MainLayout>
  )
  
}