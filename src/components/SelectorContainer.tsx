import type { PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
  className?: string;
}

export const SelectorContainer = ({ children, className }: Props) => {
  return (
    <section className={`w-full min-h-screen px-5 py-10 flex flex-col items-center ${className}`}>
      { children }
    </section>
  )
}