/**
 * ApiResponse is a generic interface for structuring responses from an API.
 *
 * @template T The type of data that the API response will contain.
 */
export interface ApiResponse<T> {
  /**
   * The HTTP status code of the response.
   */
  code: number;

  /**
   * The actual data payload of the response.
   */
  data: T;

  /**
   * A human-readable message providing more details about the response.
   */
  message: string;

  /**
   * A unique identifier for the request, useful for tracing and debugging.
   */
  traceId: string;
}

export type PaginationRequest = {
  pageNum: number;
  pageSize: number;
};

export type PaginationResponse<T> = {
  content: T[];
  totalElements: number;
  pageNum: number;
  pageSize: number;
  totalPages: number;
};
