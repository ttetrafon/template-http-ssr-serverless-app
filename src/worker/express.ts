import type { HandlerConfig } from './handler.js';
import { createHandler } from './handler.js';

/** Minimal Express-compatible types — avoids pulling in @types/express. */
interface Req {
  originalUrl: string;
  method: string;
  headers: Record<string, string | string[] | undefined>;
}

interface Res {
  status(code: number): Res;
  set(headers: Record<string, string>): Res;
  end(body: string): void;
}

type Middleware = (req: Req, res: Res, next: () => void) => void;

/**
 * Creates an Express/Connect middleware.
 *
 * Usage:
 *   import express from 'express';
 *   import { createExpressMiddleware } from './worker/express.js';
 *   const app = express();
 *   app.use('/assets', express.static('dist/client/assets'));
 *   app.use(createExpressMiddleware({ routes, aliases }));
 */
export function createExpressMiddleware(config: HandlerConfig): Middleware {
  const handle = createHandler(config);

  return async (req, res, _next) => {
    const headers: Record<string, string> = {};
    for (const [key, value] of Object.entries(req.headers)) {
      if (typeof value === 'string') headers[key] = value;
    }

    const fw = await handle({
      url: req.originalUrl,
      method: req.method,
      headers,
    });
    res.status(fw.status).set(fw.headers).end(fw.body);
  };
}
