import type { HandlerConfig } from './handler.js';
import { createHandler } from './handler.js';

/** Minimal typing for API Gateway v2 event — avoids pulling in @types/aws-lambda. */
interface APIGatewayEvent {
  rawPath: string;
  rawQueryString: string;
  headers: Record<string, string>;
  requestContext: { http: { method: string } };
}

interface LambdaResult {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

/**
 * Creates an AWS Lambda handler (API Gateway v2 / HTTP API).
 *
 * Usage:
 *   import { createLambdaHandler } from './worker/lambda.js';
 *   export const handler = createLambdaHandler({ routes, aliases });
 */
export function createLambdaHandler(config: HandlerConfig) {
  const handle = createHandler(config);

  return async (event: APIGatewayEvent): Promise<LambdaResult> => {
    const fw = await handle({
      url: event.rawPath + (event.rawQueryString ? '?' + event.rawQueryString : ''),
      method: event.requestContext.http.method,
      headers: event.headers,
    });
    return { statusCode: fw.status, headers: fw.headers, body: fw.body };
  };
}
