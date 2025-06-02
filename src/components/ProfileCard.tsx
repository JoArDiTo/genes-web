import type { ProfileResponse } from "../interfaces/ProfileResponse"
import { UserRole } from "../lib/enum"

export const ProfileCard = ({ profile }: { profile: ProfileResponse }) => {
  const { userData: user, studentData: student } = profile;
  
  const handleOpenModal = () => {
    const dialog = document.getElementById('myDialog')

    const isDialogElement = dialog instanceof HTMLDialogElement
    if (!isDialogElement) return;
    
    dialog.showModal();
  }

  return (
    <article className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg px-6 py-10">
      <header className="flex flex-col items-center justify-center pb-8">
        <img src={ user.imageUrl } alt="Imagen referencial de un perfil" className="rounded-full w-32 h-32 mb-4" />
        <h2 className="text-md sm:text-2xl font-bold">{ user.firstname } { user.lastname }</h2>
        <p className="text-sm sm:text-lg font-semibold">{ user.role === UserRole.STUDENT ? "ESTUDIANTE" : "DOCENTE" }</p>
      </header>
      <main className="w-6/7 flex flex-col pb-8 [&>p]:text-sm [&>p]:sm:text-lg [&>p]:flex [&>p]:flex-wrap [&>p]:justify-between [&>p]:text-gray-600">
        <h2 className="text-lg font-semibold">Información personal</h2>
        <hr />
        <p><strong>DNI: </strong>{ user.documentId }</p>
        <p><strong>Correo: </strong>{user.email}</p>
        <p><strong>Teléfono: </strong>{ user.phoneNumber }</p>
        <p><strong>Género: </strong>{ user.gender }</p>
        <p><strong>Edad: </strong>{ user.age }</p>
        {
          user.role === UserRole.STUDENT && student && (
            <>
              <h2 className="pt-3 text-lg font-semibold">Información académica</h2>
              <hr />
              <p><strong>Grado: </strong>{ student.grade }</p>
              <p><strong>Nivel: </strong>{ student.level }</p>
              <p><strong>Salón: </strong>{ student.section }</p>
            </>
          )
        }
      </main>

      <footer>
        <button onClick={ handleOpenModal } className="self-end cursor-pointer text-center font-semibold px-6 py-3 rounded-2xl outline outline-black transition hover:bg-black hover:text-white w-full sm:w-auto">Cerrar Sesión</button>
      </footer>
    </article>
  )
}