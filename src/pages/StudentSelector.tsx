import useFetch from "../hooks/useFetch"
import type { StudentResponse } from "../interfaces/Student"
import { MainLayout } from "../layouts/MainLayout"
import { getStudents } from "../lib/api"
import { StudentCard } from "../components/StudentCard"
import { SelectorContainer } from "../components/SelectorContainer"
import Loading from "../components/Loading"
import ErrorContent from "../components/Error"

export const StudentSelector = () => {

  const {
    data: studentsData,
    loading: studentsLoading,
    error: studentsError
  } = useFetch<StudentResponse[]>(() => getStudents())

  return (
    <MainLayout>
      <SelectorContainer>
        <h1 className="text-2xl font-bold mb-5 ">Estudiantes</h1>
        {studentsLoading && <Loading />}
        {studentsError && <ErrorContent /> }
        {!studentsLoading && !studentsError && studentsData && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {studentsData.map((data) => (
              <StudentCard key={data.user.id} {...data} />
            ))}
          </div>
        )}
      </SelectorContainer>
    </MainLayout>
  )
}