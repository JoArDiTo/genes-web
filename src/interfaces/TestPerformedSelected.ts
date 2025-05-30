export interface TestPerformedSelected {
  id: string
  score: number
  userId: string
  createdAt: string
  templateTest: TemplateTest
  interpretation: string
  answers: Answer[]
}

interface TemplateTest {
  id: string
  name: string
  description: string
}

interface Answer {
  question: string
  alternative: string
  value: number
}
