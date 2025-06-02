import { useState } from "react"
import { StudentCard } from "../components/StudentCard"
import type { StudentResponse } from "../interfaces/Student"
import { SECTIONS, GENDER, GRADE } from "../lib/enum"
import { Link } from 'wouter'

export const StudentList = ({ students }: { students: StudentResponse[] }) => {
  const [search, setSearch] = useState<{ name: string, gender: string, section: string, grade: number }>({
    name: "",
    gender: "",
    section: "",
    grade: 5,
  })

  const filterStudents = (s: StudentResponse[]) => {
    return s.filter((student) => {
      return (
        (
          student.user.firstname.toLowerCase().includes(search.name.toLowerCase()) ||
          student.user.lastname.toLowerCase().includes(search.name.toLowerCase())
        ) &&
        (search.gender === "" || student.user.gender === search.gender) &&
        (search.section === "" || student.student.section === search.section) &&
        (student.student.grade === search.grade)
      )
    })
  }

  const filteredStudents = filterStudents(students)

  return (
    <>
      <section className="w-full pb-5 flex items-center flex-col xl:flex-row gap-3">
        <label className="w-full">
          <p className="font-semibold">Filtrar por nombres y apellidos</p>
          <input
            type="text"
            placeholder="Buscar por nombres y apellidos"
            value={search.name}
            onChange={(e) => setSearch(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
        </label>
        <div className="w-full flex flex-col justify-between gap-3 sm:flex-row [&>label>p]:inline [&>label>p]:font-semibold">
          <label>
            <p>Filtrar por género</p>
            <select
              value={search.gender}
              onChange={(e) => setSearch(prev => ({ ...prev, gender: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            >
              <option value="">Todos los géneros</option>
              <option value={GENDER.MASCULINO}>Masculino</option>
              <option value={GENDER.FEMENINO}>Femenino</option>
            </select>
          </label>
          <label>
            <p>Filtrar por sección</p>
            <select
              value={search.section}
              onChange={(e) => setSearch(prev => ({ ...prev, section: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              >
              <option value="">Todas las secciones</option>
              {
                Object.values(SECTIONS).map((sec, index) => (
                  <option key={index} value={sec}>{sec}</option>
                ))
              }
            </select>
          </label>
          <label>
            <p>Filtrar por grado</p>
            <select
              value={search.grade}
              onChange={(e) => setSearch(prev => ({ ...prev, grade: parseInt(e.target.value) }))}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            >
              {
                GRADE.map((grade, index) => (
                  <option key={index} value={grade.value}>
                    {grade.label} Grado
                  </option>
                ))
              }
            </select>
          </label>
        </div>
      </section>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 justify-items-center">
        {filteredStudents.map((data) => (
          <Link className="w-full" key={data.user.id} href="#">
            <StudentCard {...data} />
          </Link>
        ))}
      </section>
    </>
  )
}