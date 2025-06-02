import type { StudentResponse } from "../interfaces/Student"

export const StudentCard = (data: StudentResponse) => {
  const { user, student } = data;
  
  return (
    <article className="bg-slate-100/25 border rounded-2xl shadow-md p-4 flex flex-col items-center text-center w-full h-full">
      <img
        className="w-24 h-24 rounded-full object-cover mb-3"
        src={user.imageUrl}
        alt={`Imagen del estudiante ${user.firstname} ${user.lastname}`}
      />
      <h2 className="font-semibold text-lg">{user.firstname} <br /> {user.lastname}</h2>
      <p className="text-gray-600 text-sm sm:text-base mb-1">{student.level}</p>
      <p className="text-gray-500 text-sm sm:text-base">Grado {student.grade} - {student.section}</p>
    </article>
  )
}