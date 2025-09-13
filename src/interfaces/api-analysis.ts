export interface ObservationResponse {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface AiReportResponse {
  sessionId: string;
  report: string;
}

export interface AiValidationResponse {
  sessionId: string;
  validation: string;
}
