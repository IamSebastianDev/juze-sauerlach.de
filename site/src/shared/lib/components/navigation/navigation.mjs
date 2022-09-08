/** @format */

import './navigation.css';
import { Core } from '../core/core.component.mjs';
import Icons from '../../../utils/icons.util.mjs';
import { iconConfig } from '../../../configs/icons.config.mjs';
const { icons } = Icons;

class JNavigation extends Core {
    static get observedAttributes() {
        return ['data'];
    }

    events = [
        {
            type: 'click',
            selector: 'a.nav-item',
            action: (ev) => this.handleClick(ev, false),
        },
        {
            type: 'click',
            selector: 'button.nav-switch',
            action: (ev) => this.handleClick(ev),
        },
    ];

    constructor() {
        super();
        this.template = document.createElement('template');
        this.template.innerHTML = this.html`
        <nav class="nav">
            <ul class="nav-outlet" state="false"></ul>
            <button class="nav-switch hidden">
                <span></span>
            </button>
        </nav>
    `;
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.injectCSS();
        this.shadowRoot.append(this.template.content);

        this.listen('click');
    }

    attributeChangedCallback(attr, oldProps, newProps) {
        this.data.navigationItems = JSON.parse(newProps);

        this.render();
    }

    render() {
        [...this.$('.nav-outlet').childNodes].forEach((node) => node.remove());

        const items = this.data.navigationItems
            .map(
                ({ title, tooltip, dest, icon }) => this.html`
            <li class="nav-list-item">
                <a class="nav-item" href="#${dest}" tooltip="${tooltip}" title="${title}">
                    <span>
                        ${icons[icon].toString({ ...iconConfig, width: 24, height: 24, 'stroke-width': 2 })}
                    </span>
                </a>
            </li>`
            )
            .join('');
        this.$('.nav-outlet').innerHTML = items;
    }

    handleClick(ev, forceState) {
        this.data.navigationState = forceState || !this.data.navigationState;
        this.$('button.nav-switch').setAttribute('transform', this.data.navigationState);
        this.$('.nav-outlet').setAttribute('state', this.data.navigationState);
    }
}

customElements.define('j-navigation', JNavigation);
