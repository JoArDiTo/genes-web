import useFetch from "../hooks/useFetch"
import { type TemplateTest } from "../interfaces/TemplateTest"
import { MainLayout } from "../layouts/MainLayout"
import { getTemplateTests } from "../lib/api"
import { TemplateTestCard } from "../components/TemplateTestCard"
import { SelectorContainer } from "../components/SelectorContainer"

export const TestSelectorPage = () => {
  const {
    data: templateTestData,
    loading: templateTestLoading,
    error: templateTestError,
  } = useFetch<TemplateTest[]>(() => getTemplateTests())

  return (
    <MainLayout>
      <SelectorContainer>
        <h1 className="text-2xl font-bold mb-5">Test Disponibles</h1>
        {
          templateTestLoading
          ? (
            <div className="flex items-center justify-center w-full h-full py-10">
              <span className="loader">Cargando datos...</span>
            </div>
          )
          : templateTestError
          ? (
            <div className="flex items-center justify-center w-full h-full py-10">
              <p className="text-red-500">Ocurrió un error al cargar el perfil.</p>
            </div>
          )
          : templateTestData && (
            <>
              {
                templateTestData.map((templateTest) => (
                  <TemplateTestCard key={ templateTest.id } { ...templateTest } />
                ))
              }
            </>
          )
        }
      </SelectorContainer>
    </MainLayout>
  )
}