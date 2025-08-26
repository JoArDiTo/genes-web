export interface TemplateTestResponse {
  id: number;
  uuid: string;
  name: string;
  author: string;
  description: string;
  objectives: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TemplateTestByUUIDResponse extends TemplateTestResponse {
  questions: QuestionResponse[];
  alternatives: AlternativeResponse[];
}

export interface QuestionResponse {
  id: number;
  content: string;
}

export interface AlternativeResponse {
  id: number;
  content: string;
  value: number;
}

export interface MyEvaluationResponse {
  testPerformed: TestPerformedResponse;
  templateTest: TemplateTestResponse;
  answers: AnswersResponse[];
}

export interface TestPerformedResponse {
  id: string;
  uuid: string;
  score: string;
  interpretation: string;
  performedAt: Date;
  riskLevel: string;
}

export interface AnswersResponse {
  question: string;
  alternative: string;
}
