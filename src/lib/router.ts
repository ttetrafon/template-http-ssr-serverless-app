import type { RouteDefinition, RouteTable, RouteAliases } from '../type/index.js';

export interface MatchedRoute {
  definition: RouteDefinition;
  /** The matched path segments, e.g. ["about"] for "/about". */
  segments: string[];
}

/**
 * Creates a router from a route table and optional aliases.
 * Returns a `match(pathname)` function.
 */
export function createRouter(routes: RouteTable, aliases: RouteAliases = {}) {
  function match(pathname: string): MatchedRoute | null {
    // Normalize: strip trailing slash (keep "/" as-is)
    let path = pathname.length > 1 && pathname.endsWith('/')
      ? pathname.slice(0, -1)
      : pathname;

    // Resolve alias
    if (aliases[path]) {
      path = aliases[path];
    }

    // Strip leading slash for lookup
    const key = path.startsWith('/') ? path.slice(1) : path;
    const segments = key.split('/').filter(Boolean);

    if (routes[key]) {
      return { definition: routes[key], segments };
    }

    return null;
  }

  return { match };
}
