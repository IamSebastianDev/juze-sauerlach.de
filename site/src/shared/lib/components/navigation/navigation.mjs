/** @format */

import './navigation.css';
import Pangolicons from '../../../utils/icons.util.mjs';
const { icons } = Pangolicons;
import { Core } from '../core/core.component.mjs';

class JNavigation extends Core {
    static get observedAttributes() {
        return ['data-nav'];
    }

    constructor() {
        super();
        this.template = document.createElement('template');
        this.template.innerHTML = `
        <nav class="nav">
            <ul class="nav-container" state="false"></ul>
            <button class="nav-burger hidden">
                <span></span>
            </button>
        </nav>
    `;
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.injectCSS();
        this.shadowRoot.append(this.template.content);
        this.navAnchor = this.shadowRoot.querySelector('.nav-container');

        if (this.getAttribute('data-nav')) {
            this.navAnchor.append(...JSON.parse(newProps).map(this.createNavigationItem));
        }

        this.shadowRoot.addEventListener('click', (ev) => {
            if (ev.target.closest('.nav-burger')) {
                this.transform();
            } else if (ev.target.closest('.nav-link') || ev.target.closest('.nav-label')) {
                this.transform(false);
                window.scrollTo({ top: 0 });
            }
        });
    }

    transform(state) {
        const currentState = this.navAnchor.getAttribute('state');
        this.navAnchor.setAttribute('state', state || (currentState === 'true' ? 'false' : 'true'));
        this.shadowRoot
            .querySelector('.nav-burger')
            .setAttribute('transform', state || (currentState === 'true' ? 'false' : 'true'));
    }

    attributeChangedCallback(attr, oldProps, newProps) {
        if (!this.shadowRoot) return;

        [...this.navAnchor.childNodes].forEach((node) => node.remove());
        this.navAnchor.append(...JSON.parse(newProps).map(this.createNavigationItem));
    }

    createNavigationItem({ title, tooltip, dest, icon }) {
        const listItem = document.createElement('li');
        listItem.className = 'nav-item';

        const link = document.createElement('a');
        link.alt = title;
        link.className = 'nav-link';
        link.setAttribute('title', title);
        link.setAttribute('tooltip', tooltip);
        link.href = `#${dest}`;
        link.append(icons[icon]?.toSvg({}));

        const label = document.createElement('a');
        label.textContent = tooltip;
        label.className = 'nav-label';
        label.href = `#${dest}`;

        listItem.append(link, label);
        return listItem;
    }
}

customElements.define('j-navigation', JNavigation);
