import { AuthContext } from "../contexts/AuthContext";
import useFetch from "../hooks/useFetch";
import { MainLayout } from "../layouts/MainLayout";
import { getProfile } from "../lib/api";
import { useContext } from "react";
import type { ProfileResponse } from "../interfaces/ProfileResponse.ts";
import { ProfileCard } from "../components/ProfileCard.tsx";
import Loading from "../components/Loading.tsx";
import ErrorContent from "../components/Error.tsx";
import { SelectorContainer } from "../components/SelectorContainer.tsx";

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
      <SelectorContainer>
        <h1 className="text-2xl font-bold mb-5">Mi Perfil</h1>
          {profileLoading && <Loading />}
          {profileError && <ErrorContent />}
          {!profileLoading && !profileError && profileData && <ProfileCard profile={profileData} />}
        </SelectorContainer>
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
