/** @format */

import './heading.css';
import { Content } from '../content.mjs';

class JHeading extends Content {
    constructor() {
        super();
        this.template = document.createElement('template');
        this.template.innerHTML = ``;
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.injectCSS();
        this.shadowRoot.append(this.template.content);

        this.completedCallback();
    }

    updateComponent({ text, level, textAlign }) {
        if (!level) return;

        const heading = document.createElement(`h${level}`);
        heading.className = 'block block-heading';

        if (text) {
            heading.innerHTML = text;
        }

        if (textAlign) {
            const { alignment } = textAlign;
            heading.style.textAlign = alignment;
        }

        this.render(heading);
    }
}

customElements.define('j-heading', JHeading);
