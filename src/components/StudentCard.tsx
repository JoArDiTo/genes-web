import type { StudentResponse } from "../interfaces/Student"

export const StudentCard = ({ data }: { data: StudentResponse}) => {
  const { user, student } = data;
  
  return (
    <article className="bg-slate-100/25 border rounded-2xl shadow-md px-2 py-6 flex flex-col items-center text-center w-full h-full">
      <img className="size-16 sm:size-24 rounded-full object-cover mb-3" src={user.imageUrl} alt={`Imagen del estudiante ${user.firstname} ${user.lastname}`} />
      <p className="text-gray-500 text-xs sm:text-base">{student.section}</p>
      <h2 className="font-semibold text-sm sm:text-lg">{user.firstname} <br /> {user.lastname}</h2>
      <p className="text-gray-500 text-xs sm:text-base">{student.grade} grado de</p>
      <p className="text-gray-600 text-xs sm:text-base mb-1">{student.level}</p>
    </article>
  )
}