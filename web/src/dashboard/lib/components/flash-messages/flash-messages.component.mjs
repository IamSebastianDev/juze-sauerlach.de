/** @format */

import { Core } from '../../../../shared/lib/components/core/core.component.mjs';
import './flash-messages.css';
import Pangolicons from '../../../../shared/utils/icons.util.mjs';
import { iconConfig } from '../../../../shared/configs/icons.config.mjs';
const { x, checkmarkCircle, circleX, infoCircle } = Pangolicons.icons;

class JFlashMessages extends Core {
    constructor() {
        super();
        this.template = document.createElement('template');
        this.template.innerHTML = this.html`
            <div class="message">
                <span class="message-icon"></span>
                <span class="message-text"></span>
                <button class="message-clear">
                    ${x.toString({ ...iconConfig })}
                </button>
            </div>
        `;
    }

    icon = {
        success: checkmarkCircle,
        error: circleX,
        info: infoCircle,
    };

    connectedCallback() {
        const type = this.getAttribute('type');
        const text = this.getAttribute('text');

        this.attachShadow({ mode: 'open' });
        this.injectCSS();
        this.shadowRoot.append(this.template.content);
        this.$('.message-icon').append(this.icon[type]?.toSvg({ ...iconConfig }));
        this.$('.message-text').innerHTML = text;
        this.$('.message-clear').addEventListener('click', (ev) => {
            this.dissolve(0);
        });

        this.dissolve(5000);
    }

    dissolve(delay) {
        window.setTimeout(() => {
            this.$('.message').classList.add('fade-out');
            window.setTimeout(() => {
                this.remove();
            }, 150);
        }, delay);
    }
}

customElements.define('j-flash-message', JFlashMessages);
