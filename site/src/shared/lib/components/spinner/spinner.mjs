/** @format */

import './spinner.css';
import { receive } from 'straemjs';
import { Core } from '../core/core.component.mjs';

class JSpinner extends Core {
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

        this.listener = receive('page-complete').from(window);
        this.disposeListener = this.listener.then((ev) => this.removeLoader());
    }

    get loader() {
        if (!this.shadowRoot) return;
        return this.shadowRoot.querySelector('.loader');
    }

    displayLoader() {
        this.shadowRoot.setAttribute('state', 'true');
        this.shadowRoot.querySelector('.loader').style.display = 'grid';
    }
    removeLoader() {
        if (!this.loader) return;

        // document.querySelector('j-spinner').setAttribute('state', 'false');
        this.setAttribute('state', 'false');
        window.setTimeout(() => {
            this.shadowRoot.querySelector('.loader').style.display = 'none';
        }, 500);
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.injectCSS();
        this.shadowRoot.append(this.template.content);
        if (this.getAttribute('state') === 'false') {
            this.shadowRoot.querySelector('.loader').style.display = 'none';
        }
    }

    disconnectedCallback() {
        this.disposeListener();
    }
}

customElements.define('j-spinner', JSpinner);
