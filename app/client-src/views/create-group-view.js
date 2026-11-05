import { html } from 'lit';

import { BSLitElement } from '../base/bs-lit-element';

class CreateGroup extends BSLitElement {
    static styles = [
        super.styles
    ]

    static properties = {
        _groups: {state: true}
    }

    constructor() {
        super();
        this._example = [];
    }

    render() {
        return html`
            <h1>Create Group</h1>
        `;
    }
}

customElements.define('create-group-view', CreateGroup);