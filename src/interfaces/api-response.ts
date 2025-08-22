export interface ApiResponse<T> {
  message: string;
  result?: T;
  results?: T[];
  status?: number;
}
