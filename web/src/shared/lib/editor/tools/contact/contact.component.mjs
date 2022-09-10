/** @format */

import './contact.css';
import { Content } from '../content.mjs';
import { postMail } from '../../../../services/mail.service.mjs';

class JContact extends Content {
    constructor() {
        super();
        this.template = document.createElement('template');
        this.template.innerHTML = this.html`
        <div class="block block-container">
            <form class="block-form">
                <div class="block-fields">

                </div>
                <div class="block-submit">
                    <input type="checkbox" name="consent" />
                    <span class="consent-note">Ich bin damit einverstanden, dass die abgesendeten Daten zum Zwecke der Übertragung gespeichert und verarbeitet werden. Mehr hierzu in unserer <a href="/impressum.html#Datenschutz">Datenschutzerklärung</a></span>
                    <button type="submit">Abschicken</button>
                </div>
            </form>
        </div>`;
    }

    validateForm({ email, message, name, consent }) {
        const validations = {
            email: [],
            message: [],
            name: [],
            consent: [],
        };

        if (!consent) {
            validations.consent = [
                ...validations.consent,
                'Bitte bestätige, dass du den Datenschutzbestimmungen zustimmst.',
            ];
        }

        if (!email || email.trim() === '') {
            validations.email = [...validations.email, 'Bitte teile uns deine Mailadresse mit.'];
        }

        if (email.trim() !== '' && !email.includes('@') && !email.includes('.')) {
            validations.email = [...validations.email, 'Bitte trage eine korrekte Mailadresse ein.'];
        }

        if (!message || message.trim() === '') {
            validations.message = [...validations.message, 'Bitte trage hier deine Nachricht ein.'];
        }

        if (message.trim().length > 1 && message.trim().length < 30) {
            validations.message = [...validations.message, 'Deine Nachricht sollte länger sein.'];
        }

        return validations;
    }

    setValidationMessages(messages) {
        console.log({ messages });
    }

    submit(ev) {
        ev.preventDefault();

        const email = this.$('[name=email]').value;
        const message = this.$('[name=text]').value;
        const name = this.$('[name=name]').value;
        const consent = this.$('[name=consent]').checked;

        const validationMessages = this.validateForm({ email, message, name, consent });

        if (Object.values(validationMessages).every((validation) => validation.length === 0)) {
            this.sendMail({ email, message, name });
        } else {
            this.setValidationMessages(validationMessages);
        }
    }

    async sendMail({ email, message, name }) {
        const result = await postMail(email, name, message);
        if (!result.error) {
            this.$('.block-submit button').textContent = 'Abgeschickt!';
        }
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.injectCSS();
        this.shadowRoot.append(this.template.content);

        this.completedCallback();
        this.$('form').addEventListener('submit', (ev) => this.submit(ev));
    }

    updateComponent({ fields }) {
        const elements = fields.map(({ type, name }) => {
            const container = document.createElement('div');
            container.className = 'block-input-container';

            const label = document.createElement('label');
            label.className = 'block-label hidden';
            label.textContent = name;

            let inputElement;

            switch (type) {
                case 'text':
                    inputElement = document.createElement('textarea');
                    inputElement.className = 'block-text';
                    break;
                case 'email':
                case 'name':
                    inputElement = document.createElement('input');
                    inputElement.className = 'block-input';
                    break;
            }

            inputElement.placeholder = 'Deine ' + name;
            inputElement.name = type;

            container.append(label, inputElement);
            return container;
        });

        this.render(elements, this.shadowRoot.querySelector('.block-fields'));
    }
}

customElements.define('j-contact', JContact);
