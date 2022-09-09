/** @format */

/** @format */

import { Core } from '../../../../shared/lib/components/core/core.component.mjs';
import './modal.css';
import icons from '../../../../shared/utils/icons.util.mjs';
import { nonNull } from '../../../../shared/utils/nonNull.util.mjs';
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
                    </div>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.injectCSS();
    }

    actionItems = [
        {
            label: 'Speichern',
            id: 'modal-confirm',
            action: (ev) => {
                this.onConfirm({ data: this.injectable.data });
            },
        },
        {
            label: 'Verlassen',
            id: 'modal-leave',
            action: (ev) => {
                this.close();
            },
        },
    ];

    events = [
        {
            type: 'click',
            selector: 'button#modal-close',
            action: (ev) => {
                this.close();
            },
        },
    ];

    injectModalComponent() {
        this.injectable = document.createElement(this.getAttribute('inject'));
        this.injectable.data = this.data;
        this.injectable['close'] = this.close.bind(this);

        this.$('.modal-content-outlet').append(this.injectable);
    }

    open(isFullscreen = false) {
        document.body.style.overflow = 'hidden';
        this.shadowRoot.append(this.template.content);

        this.$('.modal').setAttribute('fullscreen', isFullscreen);
        this.renderActionItems();
        this.injectModalComponent();
        this.listen('click');
    }

    close() {
        document.body.removeAttribute('style');
        this.onClose && this.onClose();
        this.remove();
    }

    renderActionItems() {
        const items = [...this.customActionItems, ...this.actionItems];
        [...this.$('.modal-controls').childNodes].forEach((node) => node.remove());

        this.$('.modal-controls').append(
            ...items
                .map(({ label, action, id }) => {
                    if (!this.onConfirm && id === 'modal-confirm') return null;
                    const button = document.createElement('button');
                    button.className = 'modal-button';
                    button.innerHTML = label;
                    id && (button.id = id);
                    button.addEventListener('click', (ev) => action(ev));
                    return button;
                })
                .filter(nonNull)
        );
    }
}

customElements.define('j-modal-shell', JModalShell);
