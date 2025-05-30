import { Link } from "wouter"
import type { TemplateTest } from "../interfaces/TemplateTest"
import { NoteIcon } from "../icons/Note"

export const TemplateTestCard = (templateTest: TemplateTest) => {
  const { id, name, author, description } = templateTest

  return (
    <Link href={`/cuestionarios/${id}`} key={id} className="block max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
      <article className="">
        <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          <NoteIcon /> {name}
        </p>
        <p className="text-sm font-bold">{author}</p>
        <p className="text-base mb-3 font-normal text-gray-700">{description}</p>
      </article>
    </Link>
  ) 
}