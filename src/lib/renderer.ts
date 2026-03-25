import type { RouteDefinition } from '../type/index.js';

const DEFAULT_SHELL = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><!--title--></title>
  <meta name="description" content="<!--description-->" />
</head>
<body>
  <div id="app"><!--ssr-outlet--></div>
  <!--scripts-->
</body>
</html>`;

export interface RenderOptions {
  route: RouteDefinition;
  /** Pre-rendered inner HTML from the route handler (SSR). */
  innerHtml?: string;
  /** Base HTML shell — must contain <!--ssr-outlet-->. */
  shell?: string;
  /** Client entry script path to inject. */
  clientEntry?: string;
}

/**
 * Renders the full HTML page for a matched route.
 *
 * In SSR mode, `innerHtml` is placed inside the component tags.
 * In SPA mode, the component is empty and the client hydrates it.
 */
export function renderHTML(options: RenderOptions): string {
  const { route, innerHtml = '', shell = DEFAULT_SHELL, clientEntry } = options;

  const componentHtml = `<${route.component}>${innerHtml}</${route.component}>`;

  let html = shell
    .replace('<!--title-->', route.title ?? '')
    .replace('<!--description-->', route.description ?? '')
    .replace('<!--ssr-outlet-->', componentHtml);

  if (clientEntry) {
    html = html.replace(
      '<!--scripts-->',
      `<script type="module" src="${clientEntry}"></script>`,
    );
  }

  return html;
}
