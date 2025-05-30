export interface TemplateTestSelected {
  id: string;
  name: string;
  description: string;
  author: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
  questions: Question[];
  alternatives: Alternative[];
}

export interface Question {
  id: string;
  content: string;
}

export interface Alternative {
  id: string;
  content: string;
  value: number;
}