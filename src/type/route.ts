import type { FrameworkRequest, FrameworkResponse } from './http.js';

/** A single route definition. */
export interface RouteDefinition {
  /** Web component tag name to render (e.g. "page-home"). */
  component: string;
  title?: string;
  description?: string;
  /**
   * Optional server-side handler for SSR.
   * Return an HTML string to inject inside the component,
   * or a full FrameworkResponse to take complete control.
   */
  handler?: (req: FrameworkRequest) => Promise<string | FrameworkResponse> | string | FrameworkResponse;
}

/** Route table: path key → definition. */
export type RouteTable = Record<string, RouteDefinition>;

/** Path aliases, e.g. { "/": "/home" }. */
export type RouteAliases = Record<string, string>;
