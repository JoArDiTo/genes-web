import type { TemplateTest } from "../interfaces/TemplateTest"
import { NoteIcon } from "../icons/Note"

export const TemplateTestCard = ({ templateTest }: { templateTest: TemplateTest }) => {
  const { name, author, description } = templateTest

  return (
    <article className="block w-full max-w-md p-4 sm:p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 transition-colors">
      <p className="mb-2 text-xl sm:text-2xl font-semibold tracking-tight text-gray-900 flex items-center gap-2">
        <NoteIcon /> {name}
      </p>
      <p className="text-xs sm:text-sm font-bold">{author}</p>
      <p className="text-sm sm:text-base mb-3 font-normal text-gray-700">{description}</p>
    </article>
  ) 
}