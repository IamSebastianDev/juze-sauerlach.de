/** @format */

import { Core } from '../../../../shared/lib/components/core/core.component.mjs';
import './file-browser.css';
import { transformJSON } from '../../../../shared/utils/transformJSON.util.mjs';
import Icons from '../../../../shared/utils/icons.util.mjs';
import { iconConfig } from '../../../../shared/configs/icons.config.mjs';
const { file, convertToLink } = Icons.icons;

class JFileBrowserOutlet extends Core {
    constructor() {
        super();
        this.template = document.createElement('template');
        this.template.innerHTML = this.html`
            <div class="file-container"></div>
        `;
    }

    events = [
        {
            type: 'click',
            selector: 'button.file-copy-overlay',
            action: (ev) => this.handleCardClick(ev),
        },
    ];

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.injectCSS();
        this.shadowRoot.append(this.template.content);

        this.listen('click');
    }

    attributeChangedCallback(attr, oldProps, newProps) {
        const { type, files } = JSON.parse(newProps);
        this.type = type;
        this.files = files || [];

        this.renderCards();
    }

    renderCards() {
        [...this.$('.file-container').childNodes].forEach((node) => node.remove());
        const cards = this.files.map(({ name, path }) => {
            return this.html`
                <div class="file-card" image-data="${JSON.stringify({ name, path }).replaceAll('"', "'")}">
                    ${
                        this.type === 'images'
                            ? this.html`<img src=${path} />`
                            : file.toString({ ...iconConfig, width: 48, height: 48, 'stroke-width': 2 })
                    }
                    <span class="file-name">${name}</span>
                    <button class="file-copy-overlay">${convertToLink.toString({ ...iconConfig })} Kopieren</button>
                </div>
            `;
        });

        this.$('.file-container').innerHTML = cards.join('\n');
    }

    handleCardClick(ev) {
        const data = JSON.parse(transformJSON(ev.target.closest('div.file-card').getAttribute('image-data')));
        this.emit('onClick', { data });
    }
}

customElements.define('j-file-browser-outlet', JFileBrowserOutlet);
