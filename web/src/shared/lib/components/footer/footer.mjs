/** @format */

import './footer.css';
import { Core } from '../core/core.component.mjs';

class JFooter extends Core {
    constructor() {
        super();
        this.template = document.createElement('template');
        this.template.innerHTML = `
            <footer>
                <div>
                    <div class="footer-social-container">
                        <a
                            class="footer-social-link"
                            href="https://www.instagram.com/juzesauerlach/"
                            title="Link zur Instagram Seite"
                            rel="noreferrer noopener"
                            target="_blank"
                        >
                            <img src="/assets/images/icons/instagram_wabe.svg" alt="instagram icon" />
                        </a>
                    </div>
                    <a class="footer-link" href="/impressum" target="_self">Impressum // Datenschutz</a>
                </div>
                <a
                    class="footer-offset-link"
                    href="http://kjr-ml.de/"
                    title="KJR"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    <img src="/assets/images/kjr_wabe.png" alt="KJR wabe" />
                </a>
            </footer>`;
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.injectCSS();
        this.shadowRoot.append(this.template.content);
    }
}

customElements.define('j-footer', JFooter);
