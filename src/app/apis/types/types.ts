export interface ErrorResponse {
  error?: string;
  message?: string;
}

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success?: boolean;
}