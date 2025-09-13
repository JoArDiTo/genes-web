export interface CreateTestPerformedRequest {
  id: number;
  payload: {
    studentId: number;
    answers: {
      questionId: number;
      alternativeId: number | null;
      alternativeValue: number | null;
    }[];
  };
}

export interface GenerateReportRequest {
  sessionId?: string;
  templateTest: {
    name: string;
    description: string;
    objectives: string;
  };
  student: {
    name: string;
    age: number;
    gender: string;
  };
  answers: {
    question: string;
    alternative: string;
  }[];
}

export interface ValidateObservationRequest {
  sessionId: string;
  observation: string;
}

export interface SendObservationRequest {
  testPerformedId: number;
  content: string;
}
