/** @format */

import './image.css';
import { Content } from '../content.mjs';

class JImage extends Content {
    constructor() {
        super();
        this.template = document.createElement('template');
        this.template.innerHTML = `
            <div class="block block-container">
                <image class="block-image"></image>
                <div class="block-caption"></div>
            </div>
        `;
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.injectCSS();
        this.shadowRoot.append(this.template.content);

        this.completedCallback();
    }

    updateComponent({ url, caption, stretched, textAlign }) {
        const image = this.shadowRoot.querySelector('img.block-image');
        const captionElement = this.shadowRoot.querySelector('div.block-caption');

        if (textAlign) {
            const { alignment } = textAlign;
            this.shadowRoot.querySelector('.block-container').style.textAlign = alignment;
        }

        if (stretched !== undefined) {
            image.classList.toggle('stretched', stretched);
        }

        if (url) {
            image.src = url;
        }

        if (caption) {
            captionElement.innerHTML = caption;
        }
    }
}

customElements.define('j-image', JImage);
