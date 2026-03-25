const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host { display: block; padding: 2rem; font-family: system-ui, sans-serif; }
    h1 { margin: 0 0 1rem; }
    a { color: #0969da; }
  </style>
  <h1>About</h1>
  <p>This is a demo app using Web Components with SPA routing.</p>
  <nav><a href="/home">Back to Home</a></nav>
`;

class PageAbout extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('page-about', PageAbout);
