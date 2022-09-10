/** @format */

import './delimitor.css';
import { Content } from '../content.mjs';

class JDelimitor extends Content {
    constructor() {
        super();
        this.template = document.createElement('template');
        this.template.innerHTML = `<hr class="block block-delimitor">`;
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.injectCSS();
        this.shadowRoot.append(this.template.content);

        this.completedCallback();
    }

    updateComponent() {}
}

customElements.define('j-delimitor', JDelimitor);
