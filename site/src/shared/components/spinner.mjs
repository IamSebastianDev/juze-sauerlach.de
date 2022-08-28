/** @format */

class WebSpinner extends HTMLElement {
    static get observedAttributes() {
        return ['state'];
    }

    constructor() {
        super();

        this.template = document.createElement('template');
        this.template.innerHTML = `
            <style>
                :host([fullscreen]) .loader {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;

                    background: var(--ui-color-accent);
                    z-index: 1000; 
                    transition: var(--ui-transition-slow); 
                }
                :host([fullscreen]) span:nth-child(1) {
                    border-top-color: var(--ui-color-main);
                    border-bottom-color: var(--ui-color-main);
                }
                :host([fullscreen]) span:nth-child(2) {
                    border-left-color: var(--ui-color-main);
                    border-right-color: var(--ui-color-main);
                }
                :host([state="false"]) .loader {
                    opacity: 0; 
                }
                .loader {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: grid;
                    place-items: center;
                    background: rgba(255,255,255,0.5); 
                }
                .loader-container {
                    position: relative; 
                    display: flex; 
                    justify-content: center; 
                    align-items: center; 
                    width: 6.4em; 
                    height: 6.4em; 
                }
                .loader-container span {
                    position: absolute; 
                    width: 100%; 
                    height: 100%; 
                    border: 1em solid var(--ui-color-accent); 
                    border-radius: 50%; 
                    animation: loaderSpin 2s ease infinite;
                }
                .loader-container span:nth-child(1) {
                    animation-delay: 0s;
                    border-left-color: transparent;
                    border-right-color: transparent;
                }
                .loader-container span:nth-child(2) {
                    animation-delay: 0.2s;
                    border-top-color: transparent;
                    border-bottom-color: transparent;
                }
                @keyframes loaderSpin {
                    0% {
                        transform: rotate(0deg);
                    }
                    20% {
                        transform: rotate(0deg);
                    }              
                    80% {
                        transform: rotate(360deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            </style>
            <div class="loader">
                <div class="loader-container">
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
    }

    getLoader() {
        if (!this.shadowRoot) return;
        return this.shadowRoot.querySelector('.loader');
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(this.template.content);
        if (this.getAttribute('state') === 'false') {
            this.shadowRoot.querySelector('.loader').style.display = 'none';
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (!this.getLoader()) return;

        switch (newValue) {
            case 'false':
                window.setTimeout(() => {
                    this.shadowRoot.querySelector('.loader').style.display = 'none';
                }, 500);
                break;
            case 'true':
                this.shadowRoot.querySelector('.loader').style.display = 'grid';
                break;
        }
    }
}

customElements.define('web-spinner', WebSpinner);
