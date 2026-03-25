import type { RouteTable, RouteAliases } from '../type/index.js';

// Import components so they register as custom elements
import './components/page-home.js';
import './components/page-about.js';

export const routes: RouteTable = {
  home: {
    component: 'page-home',
    title: 'Home',
    description: 'Welcome to the app',
  },
  about: {
    component: 'page-about',
    title: 'About',
    description: 'About this app',
  },
};

export const aliases: RouteAliases = {
  '/': '/home',
};
