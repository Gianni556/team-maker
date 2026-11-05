import { html } from 'lit';

// base
import { BSLitElement } from '../base/bs-lit-element';


class HomeView extends BSLitElement {
  render() {
    return html`
      <h1>Home</h1>
      <p>Welcome to Team Maker</p>

      <a href="/createGroup">Create Group</a>

    `;
  }
}

customElements.define('home-view', HomeView);