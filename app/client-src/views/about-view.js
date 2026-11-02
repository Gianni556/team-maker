import { html } from 'lit';

// base
import { BSLitElement } from '../base/bs-lit-element';

class AboutView extends BSLitElement {
  render() {
    return html`
      <h1>About</h1>
      <p>Dies ist die Info-Seite über diese Anwendung.</p>      
    `;
  }
}

customElements.define('about-view', AboutView);