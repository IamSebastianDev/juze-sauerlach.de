/** @format */

import { Core } from '../../../../../shared/lib/components/core/core.component.mjs';
import './file-modal.css';
import Pangolicons from '../../../../../shared/utils/icons.util.mjs';
const { fullscreenExit } = Pangolicons.icons;
import { iconConfig } from '../../../../../shared/configs/icons.config.mjs';
import { copyToClipboard } from '../../../../../shared/utils/copy.util.mjs';
import { messageService } from '../../../../services/messages.service.mjs';

class JModalFiles extends Core {
    constructor() {
        super();
        this.template = document.createElement('template');
        this.template.innerHTML = this.html`
            <div class="modal-container fullscreen">
                <div class="modal-controls-container">
                    <button id="select-images" target="images">Bilder</button>
                    <button id="select-files" target="files">Dateien</button>
                    <button id="exit-fullscreen">
                        ${fullscreenExit.toString({ ...iconConfig, 'stroke-width': 2 })}
                    </button>
                </div>
                <j-file-browser-outlet style="flex-grow: 1" fullscreen></j-file-browser-outlet>
            </div>
        `;
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.injectCSS();
        this.shadowRoot.append(this.template.content);

        this.listen('click');
        this.outlet = this.$('j-file-browser-outlet');
        this.outlet.output('onClick', ({ data }) => this.handleCardClick(data));
        this.setType('images');
    }

    render() {
        const files = this.data.files[this.data.type];
        this.outlet.setAttribute('data', JSON.stringify({ type: this.data.type, files }));
    }

    setType(type) {
        [...this.$$('[target]')].forEach((node) => node.classList.remove('active'));
        this.$(`button[target=${type}]`).classList.add('active');
        this.data.type = type;
        this.render();
    }

    async handleCardClick(data) {
        let result = await copyToClipboard(data.path);
        if (result === false) {
            messageService.dispatch({ type: 'error', text: 'Kopieren fehlgeschlagen.' });
        } else {
            messageService.dispatch({ type: 'success', text: 'Pfad kopiert.' });
            this.close();
        }
    }

    events = [
        {
            type: 'click',
            selector: 'button[target]',
            action: (ev) => {
                const type = ev.target.getAttribute('target');
                this.setType(type);
            },
        },
        {
            type: 'click',
            selector: 'button#exit-fullscreen',
            action: (ev) => this.close(),
        },
    ];
}

customElements.define('j-modal-files', JModalFiles);
