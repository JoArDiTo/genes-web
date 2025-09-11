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
