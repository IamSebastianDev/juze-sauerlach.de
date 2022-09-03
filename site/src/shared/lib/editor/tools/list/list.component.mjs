/** @format */

import './list.css';
import { Content } from '../content.mjs';

class JList extends Content {
    constructor() {
        super();
        this.template = document.createElement('template');
        this.template.innerHTML = this.html``;
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.injectCSS();
        this.shadowRoot.append(this.template.content);

        this.completedCallback();
    }

    updateComponent({ style, items }) {
        if (!style || !items) return;

        // the default fallback style is the unordered list.
        const list = document.createElement(style === 'ordered' ? 'ol' : 'ul');
        list.className = 'block block-list';

        list.append(
            ...items.map((text) => {
                const element = document.createElement('li');
                element.innerHTML = text;
                return element;
            })
        );

        this.render(list);
    }
}

customElements.define('j-list', JList);
