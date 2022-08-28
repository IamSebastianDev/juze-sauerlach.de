/** @format */

import { cookie, x } from 'pangolicons';

class PrivacyBanner extends HTMLElement {
    constructor() {
        super();
        this.template = document.createElement('template');
        this.template.innerHTML = `
            <style>
                #privacy-banner {
                    background: var(--ui-color-accent);
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100vw;
                    min-height: 10em;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transform: translateY(100%);
                    transition: var(--ui-transition-medium);
                }
                #privacy-banner[visible='true'] {
                    transform: translateY(0);
                }
                span,
                button {
                    margin: 0 1em;
                    padding: 0.8em;
                }
                p {
                    padding: 0 1em;
                    max-width: 76.8em;
                    font-size: 1.4em;
                }
                button {
                    background: none;
                    border: none;
                    display: grid;
                    place-items: center;
                    transition: var(--ui-transition-fast); 
                    cursor: pointer; 
                }
                button:hover {
                    background: var(--ui-color-main); 
                }
                a {
                    text-decoration: none; 
                }
                a:hover {
                    text-decoration: underline; 
                }
                @media(max-width: 584px) {
                    #privacy-banner {
                        flex-direction: column; 
                        padding: 0.8em 0; 
                        text-align: center;
                    }
                }
            </style>
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
        this.shadowRoot.append(this.template.content);
        this.shadowRoot.querySelector('#privacy-consent').addEventListener('click', (ev) => this.setConsent());

        const consent = this.getConsent();
        if (!consent || consent === 'false') {
            this.shadowRoot.querySelector('#privacy-banner').setAttribute('visible', 'true');
        }
    }
}

customElements.define('privacy-banner', PrivacyBanner);
