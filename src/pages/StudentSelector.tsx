import useFetch from "../hooks/useFetch"
import type { StudentResponse } from "../interfaces/Student"
import { MainLayout } from "../layouts/MainLayout"
import { getStudents } from "../lib/api"
import { SelectorContainer } from "../components/SelectorContainer"
import Loading from "../components/Loading"
import ErrorContent from "../components/Error"
import { StudentList } from "./StudentList"

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
        {!studentsLoading && !studentsError && studentsData && <StudentList students={studentsData} />}
      </SelectorContainer>
    </MainLayout>
  )
}