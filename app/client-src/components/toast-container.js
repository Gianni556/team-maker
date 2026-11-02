import { html, css } from 'lit';

// base
import { BSLitElement } from '../base/bs-lit-element.js';

class ToastContainer extends BSLitElement {
  static styles = [
    super.styles,
    css`
      :host {
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        z-index: 1055;
      }
      .toast {
        margin-top: 0.5rem;
      }
    `];

  static properties = {
    toasts: {},
  };

  constructor() {
    super();

    this.toasts = [];
    this._idCounter = 0;
  }

  addToast(message, _type) {
    // todo: add a toast-type (info, warning, error, etc.)
    const id = this._idCounter++;
    this.toasts = [{ id, message }, ...this.toasts];

    setTimeout(() => this._removeToast(id), 4000);
  }

  _removeToast(id) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
  }

  render() {
    return html`
      ${this.toasts.map(
      (toast) => html`
          <div class="toast show text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
              <div class="toast-body">${toast.message}</div>
              <button
                type="button"
                class="btn-close btn-close-white me-2 m-auto"
                @click=${() => this._removeToast(toast.id)}
              ></button>
            </div>
          </div>
        `
    )}
    `;
  }
}

customElements.define('toast-container', ToastContainer);
