import type { FrameworkRequest, FrameworkResponse, RouteTable, RouteAliases } from '../type/index.js';
import { createRouter } from '../lib/router.js';
import { renderHTML } from '../lib/renderer.js';

export interface HandlerConfig {
  routes: RouteTable;
  aliases?: RouteAliases;
  /** Base HTML shell. Must contain <!--ssr-outlet-->. */
  htmlShell?: string;
}

/**
 * Creates the main request handler.
 *
 * Returns an async function that matches the URL to a route,
 * optionally runs the SSR handler, and renders HTML.
 *
 * All adapters (Cloudflare, Lambda, Express) call this.
 */
export function createHandler(config: HandlerConfig) {
  const router = createRouter(config.routes, config.aliases);

  return async function handle(req: FrameworkRequest): Promise<FrameworkResponse> {
    const url = new URL(req.url, 'http://localhost');
    const matched = router.match(url.pathname);

    if (!matched) {
      return {
        status: 404,
        headers: { 'content-type': 'text/html' },
        body: renderHTML({
          route: { component: 'not-found', title: 'Not Found' },
          shell: config.htmlShell,
        }),
      };
    }

    const { definition } = matched;

    // SSR path: run server-side handler if present
    let innerHtml = '';
    if (definition.handler) {
      const result = await definition.handler(req);
      if (typeof result === 'object' && 'status' in result) {
        return result;
      }
      innerHtml = result;
    }

    return {
      status: 200,
      headers: { 'content-type': 'text/html' },
      body: renderHTML({
        route: definition,
        innerHtml,
        shell: config.htmlShell,
      }),
    };
  };
}
