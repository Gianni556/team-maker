import { html } from 'lit';

// base
import { BSLitElement } from '../base/bs-lit-element.js';

// services
import { getToastService } from '../services/toast-service.js';

export class DemoDataFetching extends BSLitElement {
  static properties = {
    items: {},
    _newItem: { state: true }
  }

  constructor() {
    super();
    this.items = [];
    this._newItem = '';
  }

  _getItems() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', '/api/items');

    xhr.addEventListener('load', () => {
      try {
        const itemsFromBackend = JSON.parse(xhr.responseText);
        this.items = itemsFromBackend;
      } catch (err) {
        console.error(err);
      }
    });

    xhr.send();
  }

  _addItem() {
    const xhr = new XMLHttpRequest();

    xhr.open('POST', '/api/items');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener('load', () => {
      try {
        const response = JSON.parse(xhr.responseText);

        if (xhr.status >= 400) {
          getToastService().showToast(response.error || 'Fehler beim Speichern');
          return;
        }

        this.items = response;
        this._newItem = '';
      } catch (err) {
        console.error(err);
      }
    });

    xhr.send(JSON.stringify({ name: this._newItem }));
  }

  _deleteItem(id) {
    const xhr = new XMLHttpRequest();

    xhr.open('DELETE', `/api/items/${id}`);

    xhr.addEventListener('load', () => {
      try {
        if (xhr.status >= 400) {
          getToastService().showToast(response.error || 'Fehler beim Loeschen');
          return;
        }

        this.items = this.items.filter(i => i.id != id);
      } catch (err) {
        console.error(err);
      }
    });

    xhr.send();
  }

  _onInput(e) {
    this._newItem = e.target.value;
  }

  _onKeypress(e) {
    if (e.key === 'Enter') {
      this._addItem();
    }
  }

  render() {
    return html`
      <h2>Data Fetching</h2>
      <p class="text-muted">Daten vom Backend laden und senden (XHR)</p>

      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">Neues Item erfassen</h5>
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Item Name..."
              .value=${this._newItem}
              @input=${this._onInput}
              @keypress=${this._onKeypress}
            >
            <button class="btn btn-success" @click=${this._addItem}>
              Hinzufuegen
            </button>
          </div>
        </div>
      </div>

      <button class="btn btn-primary mb-3" @click=${this._getItems}>
        Load Items from Backend
      </button>

      ${this.items.length > 0
        ? html`
          <ul class="list-group">
            ${this.items.map(item => html`
              <li class="list-group-item d-flex justify-content-between align-items-center">
                ${item.name}
                <button class="btn btn-sm btn-outline-danger"
                        @click=${() => this._deleteItem(item.id)}>X</button>
              </li>
            `)}
          </ul>`
        : html`<p class="text-muted fst-italic">Noch keine Items geladen.</p>`
      }
    `;
  }
}

customElements.define('data-fetching-view', DemoDataFetching);
