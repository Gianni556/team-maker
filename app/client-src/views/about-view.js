import { html } from 'lit';

// base
import { BSLitElement } from '../base/bs-lit-element';

class AboutView extends BSLitElement {
  render() {
    return html`
      <h1>About</h1>
      <p>This is the about page of Team Maker</p>      
    `;
  }
}

customElements.define('about-view', AboutView);