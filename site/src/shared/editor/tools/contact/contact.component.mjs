/** @format */

import { Core } from '../../components/core/core.component.mjs';

export class ContactForm extends Core {
    constructor() {
        super();

        this.template = document.createElement('template');
        this.template.innerHTML = `

        `;
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.injectCSS();
        this.shadowRoot.append(this.template.content);
    }
}

customElements.define('web-contact-form', ContactForm);
