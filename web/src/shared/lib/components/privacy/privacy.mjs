/** @format */

import { cookie, x } from 'pangolicons';
import { Core } from '../core/core.component.mjs';
import './privacy.css';

class JPrivacy extends Core {
    constructor() {
        super();
        this.template = document.createElement('template');
        this.template.innerHTML = `
            <div id="privacy-banner" visible="false">
                <span> ${cookie.toString({})}</span>
                <p>
                    Hey! Diese Seite verwendet für bestimme Funktionen Cookies. Du kannst mehr über unseren Einsatz von Cookies
                    und unseren Umgang mit persönlichen Daten in unserer
                    <a href="impressum#Datenschutz">Datenschutzbestimmung</a> lesen.
                </p>
                <button id="privacy-consent">${x.toString({})}</button>
            </div>
        `;
    }

    setConsent() {
        window.localStorage.setItem('privacy-consent', 'true');
        this.shadowRoot.querySelector('#privacy-banner').setAttribute('visible', 'false');
    }

    getConsent() {
        return window.localStorage.getItem('privacy-consent');
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.injectCSS();
        this.shadowRoot.append(this.template.content);
        this.shadowRoot.querySelector('#privacy-consent').addEventListener('click', (ev) => this.setConsent());

        const consent = this.getConsent();
        if (!consent || consent === 'false') {
            this.shadowRoot.querySelector('#privacy-banner').setAttribute('visible', 'true');
        }
    }
}

customElements.define('j-privacy', JPrivacy);
