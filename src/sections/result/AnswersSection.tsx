import type { TestPerformedSelected } from "../../interfaces/TestPerformedSelected";

export const AnswersSection = ({ resultData }: { resultData: TestPerformedSelected }) => {
  return (
    <section>
      <h3 className="text-lg font-semibold mb-2">Preguntas y respuestas:</h3>
      <ul className="space-y-4 grid grid-cols-1 xl:grid-cols-2 gap-x-2">
        {resultData.answers.map((answer, idx) => (
          <li key={idx} className="border rounded p-3 [&>p]:font-medium">
            <p>{idx + 1}. <span className="font-normal">{answer.question}</span></p>
            <p className="ml-2">Respuesta: <span className="font-normal">{answer.alternative}</span></p>
          </li>
        ))}
      </ul>
    </section>
  )
}
