import { Redirect, useLocation, useRoute } from "wouter";
import { MainLayout } from "../layouts/MainLayout";
import useFetch from "../hooks/useFetch";
import { getTemplateTest, sendTest } from "../lib/api";
import type { TemplateTestSelected } from "../interfaces/TemplateTestSelected";
import { useState } from "react";
import { ArrowUpIcon } from "../icons/ArrowUp";
import { toast } from "sonner";
import Loading from "../components/Loading";
import ErrorContent from "../components/Error";

export const TestSelectedPage = () => {
  const [match, params] = useRoute("/cuestionarios/:id");
  if (!match) return <Redirect to="/cuestionarios" />

  const navigate = useLocation()[1];

  const [formData, setFormData] = useState({
    anwsers: [],
    summatory: []
  });

  const {
    data: templateTestData,
    loading: templateTestLoading,
    error: templateTestError,
  } = useFetch<TemplateTestSelected>(() => getTemplateTest(params.id))

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const answers = Object.entries(formData.anwsers).map(([questionId, alternativeId]) => ({
      questionId: String(questionId),
      alternativeId: String(alternativeId),
    }));
    

    const sum = Object.values(formData.summatory).reduce((acc: number, value) => acc + Number(value), 0);

    if (!templateTestData?.id) {
      toast.error("No se pudo enviar el test: ID de test no disponible");
      return;
    }
    
    const { id: templateTestDataId } = templateTestData;
    await sendTest(templateTestDataId, answers, sum)

    navigate("/cuestionarios")
    toast.info("Resultados enviados correctamente")
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: questionId, value: alternativeId } = e.target;
    const altValue = templateTestData?.alternatives.find((alt) => alt.id === alternativeId)?.value;

    setFormData({
      anwsers: { ...formData.anwsers, [questionId]: alternativeId }, 
      summatory: { ...formData.summatory, [questionId]: altValue }
    });
  }

  return (
    <MainLayout>
      <section className="container mx-auto p-4">
        {templateTestLoading && <Loading />}
        {templateTestError && <ErrorContent />}
        {templateTestData && (
          <form onSubmit={handleSubmit} className="w-full flex flex-col xl:flex-row justify-center gap-4 py-10">
            <section className="xl:max-w-lg">
              <article className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">{templateTestData.name}</h2>
                <div className="mb-4">
                  <p className="text-sm font-semibold">Autor:</p>
                  <p className="text-gray-700">{templateTestData.author}</p>
                </div>
                <div className="mb-6">
                  <p className="text-sm font-semibold">Descripción:</p>
                  <p className="text-gray-700">{templateTestData.description}</p>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span>{ Object.keys(formData.anwsers).length } de { templateTestData.questions.length }</span>
                  <button 
                    className={`py-2 px-4 rounded-lg text-sm lg:text-lg text-white bg-sky-500 hover:bg-sky-600 transition ${ Object.keys(formData.anwsers).length !== templateTestData.questions.length ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer' }`}
                  >
                    Enviar Resultados
                  </button>
                </div>
              </article>
            </section>
            <section className="w-full">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {
                  templateTestData.questions.map(({ id: questionId, content: questionContent }, i) => (
                    <div key={questionId} className='mx-3 p-4 bg-white mb-4 rounded-lg'>
                      <p className='text-lg mb-3'>{i+1}. {questionContent}</p>
                      {
                        templateTestData.alternatives.map(({ id: alternativeId, content: alternativeContent, value }, j) => (
                          <div key={alternativeId} className='flex items-center mb-4'>
                            <input
                              type='radio'
                              id={`0${i}0${j}-${value}`}
                              name={questionId}
                              value={alternativeId}
                              className='mr-2 peer hidden'
                              onChange={onInputChange}
                            />
                            <label
                              htmlFor={`0${i}0${j}-${value}`}
                              className='w-full py-3 px-6 rounded-lg outline-2 outline-gray-200 transition cursor-pointer peer-checked:bg-blue-500 peer-checked:text-white peer-checked:outline-4'
                            >
                              {alternativeContent}
                            </label>
                          </div>
                        ))
                      }
                    </div>
                  ))
                }
              </div>
            </section>
          </form>
        )}
      
        <a className="fixed aspect-square bg-sky-300 p-3 rounded-lg left-5 bottom-5 transition hover:scale-110" href="#top">
          <ArrowUpIcon />
        </a>
      </section>
    </MainLayout>
  )
}