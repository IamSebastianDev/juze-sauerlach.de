/** @format */

class WebFooter extends HTMLElement {
    constructor() {
        super();
        this.template = document.createElement('template');
        this.template.innerHTML = `<style>
                footer {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100vw;
                    min-height: 4em;
                    padding: 1.2em 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: var(--ui-color-dark);
                }
                .footer-offset-link {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    margin-right: 6em;
                    max-height: 6em;
                }
                .footer-offset-link img {
                    height: 6em;
                }
                .footer-social-container {
                    display: flex;
                    justify-content: center;
                }
                .footer-social-link {
                    width: 4.8em;
                    height: 4.8em;
                    padding: 0.4em;
                    transition: var(--ui-transition-fast);
                }
                .footer-social-link:hover {
                    transform: scale(1.1);
                }
                .footer-link {
                    font-size: 1.4em;
                    color: var(--ui-color-main);
                    text-decoration: none;
                }
                .footer-link:hover {
                    color: var(--ui-color-bright);
                }
                @media (max-width: 584px) {
                    footer {
                        position: relative;
                    }
                    .footer-offset-link {
                        margin-right: 1.2em;
                    }
                }
            </style>
            <footer>
                <div>
                    <div class="footer-social-container">
                        <a
                            class="footer-social-link"
                            href="https://www.facebook.com/jugendzentrumsauerlach/"
                            title="Link zur Facebook Seite"
                            rel="noreferrer noopener"
                            target="_blank"
                        >
                            <img src="/assets/images/icons/facebook_wabe.svg" alt="facebook icon" />
                        </a>
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
        this.shadowRoot.append(this.template.content);
    }
}

customElements.define('web-footer', WebFooter);
