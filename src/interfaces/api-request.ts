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
