/** @format */

import { Core } from '../../../../shared/lib/components/core/core.component.mjs';
import './file-upload.css';
import Icons from '../../../../shared/utils/icons.util.mjs';
import { iconConfig } from '../../../../shared/configs/icons.config.mjs';
const { file, convertToLink } = Icons.icons;

class JFileUpload extends Core {
    constructor() {
        super();
        this.template = document.createElement('template');
        this.template.innerHTML = this.html`
            <div class="file-container"></div>
        `;
    }

    events = [];

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.injectCSS();
        this.shadowRoot.append(this.template.content);

        this.listen('click');
    }
}

customElements.define('j-file-upload', JFileUpload);
