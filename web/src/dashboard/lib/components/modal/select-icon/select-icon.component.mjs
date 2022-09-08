/** @format */

/** @format */

import { Core } from '../../../../../shared/lib/components/core/core.component.mjs';
import './select-icon.css';
import Pangolicons from '../../../../../shared/utils/icons.util.mjs';
import { iconConfig } from '../../../../../shared/configs/icons.config.mjs';
import { receive } from 'straemjs';

class JModalSelectIcon extends Core {
    constructor() {
        super();

        this.template = document.createElement('template');
        this.template.innerHTML = this.html`
            <div class="modal-container">
                <h3>Icon auswählen / ändern</h3>
                <div class="icon-active">
                    Aktives Icon: <span id="icon-active-holder"> </span>
                </div>
                <div class="icon-selector">
                    <span>Neues Icon auswählen:</span>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.injectCSS();
        this.shadowRoot.append(this.template.content);

        this.data.selectedIcon = this.data.icon;

        this.iconSelector = document.createElement('j-icon-select');
        this.iconSelector.data.selectedIcon = this.data.selectedIcon;
        this.$('.icon-selector').append(this.iconSelector);
        this.setActiveIcon();

        this.iconSelector.output('selected', ({ name }) => {
            this.data.selectedIcon = name;
            this.setActiveIcon();
        });
    }

    setActiveIcon() {
        [...this.$('#icon-active-holder').childNodes].forEach((node) => node.remove());
        this.$('#icon-active-holder').append(
            Pangolicons.icons[this.data.selectedIcon].toSvg({
                ...iconConfig,
                'stroke-width': 1.5,
                width: 24,
                height: 24,
            })
        );
    }
}

customElements.define('j-modal-select-icon', JModalSelectIcon);
