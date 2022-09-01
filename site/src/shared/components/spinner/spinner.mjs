/** @format */

import './spinner.css';
import { Core } from '../core/core.component.mjs';

class WebSpinner extends Core {
    static get observedAttributes() {
        return ['state'];
    }

    constructor() {
        super();

        this.template = document.createElement('template');
        this.template.innerHTML = `
            <div class="loader">
                <div class="loader-container">
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
    }

    getLoader() {
        if (!this.shadowRoot) return;
        return this.shadowRoot.querySelector('.loader');
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.injectCSS();
        this.shadowRoot.append(this.template.content);
        if (this.getAttribute('state') === 'false') {
            this.shadowRoot.querySelector('.loader').style.display = 'none';
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (!this.getLoader()) return;

        switch (newValue) {
            case 'false':
                window.setTimeout(() => {
                    this.shadowRoot.querySelector('.loader').style.display = 'none';
                }, 500);
                break;
            case 'true':
                this.shadowRoot.querySelector('.loader').style.display = 'grid';
                break;
        }
    }
}

customElements.define('web-spinner', WebSpinner);
