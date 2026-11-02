import { html } from 'lit';

// base
import { BSLitElement } from '../base/bs-lit-element';

class HomeView extends BSLitElement {
  render() {
    return html`
      <h1>Home</h1>
      <p>Willkommen auf der Startseite1.</p>

      <div class="container mt-2">
          <div class="alert alert-primary">Bootstrap funktioniert!</div>
      </div>                
    `;
  }
}

customElements.define('home-view', HomeView);