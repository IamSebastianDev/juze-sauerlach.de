/** @format */

import { Core } from '../../../../shared/lib/components/core/core.component.mjs';
import './icon-select.css';
import Pangolicons from '../../../../shared/utils/icons.util.mjs';
import { iconConfig } from '../../../../shared/configs/icons.config.mjs';
import { dispatch } from 'straemjs';

class JIconSelect extends Core {
    constructor() {
        super();
        this.data = {};
        this.template = document.createElement('template');
        this.template.innerHTML = this.html`
            <div id="icon-outlet"></div>
        `;
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.injectCSS();
        this.shadowRoot.append(this.template.content);

        this.listen('click');
        this.render();
    }

    events = [
        {
            type: 'click',
            selector: '.icon-card',
            action: (ev) => {
                const name = ev.target.closest('.icon-card').getAttribute('name');
                this.data.selectedIcon = name;
                this.emit('selected', { name });
                this.render();
            },
        },
    ];

    render() {
        [...this.$('#icon-outlet').childNodes].forEach((node) => node.remove());
        this.$('#icon-outlet').innerHTML = Object.keys(Pangolicons.icons)
            .map((name) => {
                return this.html`
                    <div class="icon-card ${name === this.data.selectedIcon ? 'selected' : ''}">
                        ${Pangolicons.icons[name].toString({ ...iconConfig, 'stroke-width': 2, name })}
                    </div>
                `;
            })
            .join('\n');
    }
}

customElements.define('j-icon-select', JIconSelect);
