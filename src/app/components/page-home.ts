const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host { display: block; padding: 2rem; font-family: system-ui, sans-serif; }
    h1 { margin: 0 0 1rem; }
    a { color: #0969da; }
  </style>
  <h1>Home</h1>
  <p>Welcome to the app.</p>
  <nav><a href="/about">Go to About</a></nav>
`;

class PageHome extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('page-home', PageHome);
