import { html } from 'lit';

// base
import { BSLitElement } from '../base/bs-lit-element.js';

// services
import { getToastService } from '../services/toast-service.js';

export class TestButton extends BSLitElement {

  static styles = [super.styles];

  btnTestClicked(event) {
    console.log(`you clicked on ${event.target.id}`);
    getToastService().showToast(new Date(Date.now()).toString());
  }

  render() {
    return html`
      <button id="btnTest" class="btn btn-warning" @click=${this.btnTestClicked}>Create a toast-message</button>
    `
  }

}

customElements.define('test-toast-view', TestButton);