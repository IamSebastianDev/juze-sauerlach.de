/** @format */

import { Core } from '../../components/core/core.component.mjs';

export class Content extends Core {
    static get observedAttributes() {
        return ['data'];
    }

    constructor() {
        super();
    }

    attributeChangedCallback(attr, oldProps, newProps) {
        if (!this.shadowRoot) return;
        this.updateComponent(JSON.parse(newProps));
    }

    completedCallback() {
        if (this.getAttribute('data')) {
            this.updateComponent(JSON.parse(this.getAttribute('data')));
        }
    }

    render(nodes, target = this.shadowRoot) {
        if (target) {
            [...target.childNodes].forEach((node) => node.tagName !== 'STYLE' && node.remove());
            Array.isArray(nodes) ? target.append(...nodes) : target.append(nodes);
        }
    }
}
