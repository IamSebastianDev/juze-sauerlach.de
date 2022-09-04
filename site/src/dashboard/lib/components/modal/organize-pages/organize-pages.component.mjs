/** @format */

/** @format */

import { Core } from '../../../../../shared/lib/components/core/core.component.mjs';
import './organize-pages.css';

class JModalOrganizePages extends Core {
    constructor() {
        super();
        this.template = document.createElement('template');
        this.template.innerHTML = this.html`
            <div>Organize Pages modal</div>
        `;
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.injectCSS();
        this.shadowRoot.append(this.template.content);
        this.listen('click');
    }

    events = [];
}

customElements.define('j-modal-organize-pages', JModalOrganizePages);
