/** @format */

/** @format */

import { Core } from '../../../../shared/lib/components/core/core.component.mjs';
import './modal.css';
import icons from '../../../../shared/utils/icons.util.mjs';
import { iconConfig } from '../../../../shared/configs/icons.config.mjs';

class JModalShell extends Core {
    constructor() {
        super();
        this.template = document.createElement('template');
        this.template.innerHTML = this.html`
            <div class="modal-background">
                <div class="modal">
                    <button class="modal-button icon-button" id="modal-close">
                        ${icons.icons.x.toString({ ...iconConfig })}
                    </button>
                    <div class="modal-content-outlet"></div>
                    <div class="modal-controls">
                        <button class="modal-button" id="modal-confirm">Speichern</button>
                        <button class="modal-button" id="modal-leave">Verlassen</button>
                    </div>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.injectCSS();
    }

    events = [
        {
            type: 'click',
            selector: 'button#modal-close',
            action: (ev) => {
                this.close();
            },
        },
        {
            type: 'click',
            selector: 'button#modal-leave',
            action: (ev) => {
                this.close();
            },
        },
        {
            type: 'click',
            selector: 'button#modal-confirm',
            action: (ev) => {
                this.onConfirm({ data: this.injectable.data });
            },
        },
    ];

    injectModalComponent() {
        this.injectable = document.createElement(this.getAttribute('inject'));
        this.injectable.data = this.data;

        this.$('.modal-content-outlet').append(this.injectable);
    }

    open() {
        document.body.style.overflow = 'hidden';
        this.shadowRoot.append(this.template.content);

        this.injectModalComponent();
        this.listen('click');
    }
    close() {
        document.body.removeAttribute('style');
        this.onClose && this.onClose();
        this.remove();
    }
}

customElements.define('j-modal-shell', JModalShell);
