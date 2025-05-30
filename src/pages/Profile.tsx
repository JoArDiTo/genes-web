import { AuthContext } from "../contexts/AuthContext";
import useFetch from "../hooks/useFetch";
import { MainLayout } from "../layouts/MainLayout";
import { getProfile } from "../lib/api";
import { useContext } from "react";
import type { ProfileResponse } from "../interfaces/ProfileResponse.ts";
import { ProfileCard } from "../components/ProfileCard.tsx";

export const ProfilePage = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error('Header must be used within an AuthProvider');
  
  const { exit } = authContext

  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
  } = useFetch<ProfileResponse>(() => getProfile())

  return (
    <MainLayout>
      <section className="flex flex-col items-center justify-start py-10 px-5 text-black-app min-h-[70dvh]">
        <h1 className="text-2xl font-bold mb-5">Mi Perfil</h1>
        {
          profileLoading
          ? (
            <div className="flex items-center justify-center w-full h-full py-10">
              <span className="loader">Cargando datos...</span>
            </div>
          )
          : profileError
          ? (
            <div className="flex items-center justify-center w-full h-full py-10">
              <p className="text-red-500">Ocurrió un error al cargar el perfil.</p>
            </div>
          )
          : profileData && (
            <ProfileCard {...profileData} />
          )
        }
      </section>

      <dialog id="myDialog" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h2 className="font-semibold">¿Estás seguro que quieres cerrar sesión?</h2>
        <div className="flex justify-center gap-x-3 pt-3 flex-wrap items-center text-white">
          <form method="dialog">
            <button className="px-4 py-2 rounded-lg bg-red-500 cursor-pointer">Cancelar</button>
          </form>
          <button onClick={ exit } className="px-4 py-2 rounded-lg bg-blue-500 cursor-pointer">Cerrar Sesión</button>
        </div>
      </dialog>
    </MainLayout>
  )
}
