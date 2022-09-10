/** @format */

import './paragraph.css';
import { Content } from '../content.mjs';

class JParagraph extends Content {
    constructor() {
        super();
        this.template = document.createElement('template');
        this.template.innerHTML = this.html`<p class="block block-paragraph"></p>`;
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.injectCSS();
        this.shadowRoot.append(this.template.content);

        this.completedCallback();
    }

    updateComponent({ text, textAlign }) {
        if (!text) return;

        const paragraph = this.$('p');
        paragraph.innerHTML = text;

        if (textAlign) {
            const { alignment } = textAlign;
            paragraph.style.textAlign = alignment;
        }
    }
}

customElements.define('j-paragraph', JParagraph);
