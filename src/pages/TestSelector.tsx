import useFetch from "../hooks/useFetch"
import { type TemplateTest } from "../interfaces/TemplateTest"
import { MainLayout } from "../layouts/MainLayout"
import { getTemplateTests } from "../lib/api"
import { TemplateTestCard } from "../components/TemplateTestCard"
import { SelectorContainer } from "../components/SelectorContainer"
import Loading from "../components/Loading"
import ErrorContent from "../components/Error"
import { Link } from "wouter"

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
        {templateTestLoading && <Loading />}
        {templateTestError && <ErrorContent />}
        {!templateTestLoading && !templateTestError && templateTestData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
            {
              templateTestData.map((templateTest) => (
                <Link key={ templateTest.id } href={`/cuestionarios/${templateTest.id}`}>
                  <TemplateTestCard templateTest={templateTest} />
                </Link>
              ))
            }
          </div>
        )}
      </SelectorContainer>
    </MainLayout>
  )
}