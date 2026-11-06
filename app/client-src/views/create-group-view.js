import { html } from 'lit';

import { BSLitElement } from '../base/bs-lit-element';

class CreateGroup extends BSLitElement {
    static styles = [
        super.styles
    ]

    static properties = {
    }

    constructor() {
        super()
    }

    _createGroup() {
        let input = this.renderRoot.getElementById('input-group-name');
        let inputTest = input.value.trim();
        let err = this._controlInputText(inputTest, input);
        
        if(err) {
            // Toast service aufrufen
            console.log(err);
            return;
        }

        // Toast service aufrufen das alles passt
        console.log('everything is fine');

        // function from BSLitElement. Update the site and remembers the old
        this.updateSite('/createGroup', '/');

        
    }

    _controlInputText(text, tag) {
        text = text.trim();

        // regex that controls that there are only character A-Z and a-z and number between 0-9
        if (!(/^[a-zA-Z0-9 ]+$/.test(text))) {
            return `Only characters A-Z and numbers 0-9 are allowed in input field ${tag.getAttribute('name')}`;    
        }
        return;
    }

    render() {
        return html`
            <h1>Create Group</h1>
            <div>
                <div>
                    <label for="group-name">Group Name:</label>
                    <input type="text" id="input-group-name" name="group-name" placeholder="Volleyball hobby group" />
                </div>
                <button @click=${this._createGroup}>Create Group</button>
                <button @click=${() => this.oldSite('/createGroup')}>Cancel</button>
            </div>
        `;
    }
}

customElements.define('create-group-view', CreateGroup);