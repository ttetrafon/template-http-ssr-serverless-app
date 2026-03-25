import type { RouteTable, RouteAliases } from '../type/index.js';
import { createRouter } from './router.js';

/**
 * Initializes client-side SPA navigation.
 *
 * Call this from your client entry with your route table.
 * Sets up popstate-based routing that swaps components inside `#app`.
 */
export function initNavigator(routes: RouteTable, aliases: RouteAliases = {}) {
  const router = createRouter(routes, aliases);
  const container = document.getElementById('app');
  if (!container) throw new Error('#app container not found');

  function navigate(pathname: string, push = true) {
    const matched = router.match(pathname);
    if (!matched) {
      container!.innerHTML = '<not-found>Page not found</not-found>';
      document.title = 'Not Found';
      return;
    }

    const { definition } = matched;
    container!.innerHTML = `<${definition.component}></${definition.component}>`;

    if (definition.title) document.title = definition.title;
    if (definition.description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', definition.description);
    }

    if (push) {
      window.history.pushState(null, '', pathname);
    }
  }

  // Browser back/forward
  window.addEventListener('popstate', () => {
    navigate(window.location.pathname, false);
  });

  // Intercept same-origin link clicks for SPA navigation
  document.addEventListener('click', (e) => {
    const anchor = (e.target as Element).closest('a');
    if (!anchor || !anchor.href) return;

    const url = new URL(anchor.href);
    if (url.origin !== window.location.origin) return;

    e.preventDefault();
    navigate(url.pathname);
  });

  // Initial route
  navigate(window.location.pathname, false);

  return { navigate };
}
