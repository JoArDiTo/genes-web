export interface ApiResponse<T> {
  message: string;
  pagination?: PaginationResponse;
  result?: T;
  results?: T[];
  status?: number;
}

export interface PaginationResponse extends Pagination {
  total: number;
  totalPages: number;
}

export interface Pagination {
  page: number;
  limit: number;
}
