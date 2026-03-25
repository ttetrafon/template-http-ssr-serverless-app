/** Unified request — adapters normalize platform-specific requests into this. */
export interface FrameworkRequest {
  url: string;
  method: string;
  headers: Record<string, string | undefined>;
}

/** Unified response — adapters convert this back to platform-specific responses. */
export interface FrameworkResponse {
  status: number;
  headers: Record<string, string>;
  body: string;
}
