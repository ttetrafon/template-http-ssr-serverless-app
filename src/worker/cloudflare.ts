import type { HandlerConfig } from './handler.js';
import { createHandler } from './handler.js';

/**
 * Creates a Cloudflare Workers fetch handler.
 *
 * Usage in your worker entry:
 *   import { createCloudflareWorker } from './worker/cloudflare.js';
 *   export default createCloudflareWorker({ routes, aliases });
 */
export function createCloudflareWorker(config: HandlerConfig) {
  const handle = createHandler(config);

  return {
    async fetch(request: Request): Promise<Response> {
      const fw = await handle({
        url: request.url,
        method: request.method,
        headers: Object.fromEntries(request.headers),
      });
      return new Response(fw.body, { status: fw.status, headers: fw.headers });
    },
  };
}
