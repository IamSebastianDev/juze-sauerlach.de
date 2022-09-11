/** @format */

import './contact.css';
import { Content } from '../content.mjs';
import { postMail } from '../../../../services/mail.service.mjs';
import { Validate } from '../../../../utils/validation.util.mjs';

// Validation strategies
const validateNotEmpty = Validate.createStrategy(Validate.StringNotEmpty, 'Dieses Feld wird benötigt.');
const validateEmail = Validate.createStrategy(Validate.IsEmail, 'Bitte trage eine korrekte Email Adresse ein.');
const validateMessageLength = Validate.createStrategy(
    Validate.StringHasLength(20),
    'Deine Nachricht sollte länger sein.'
);

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
                    <input type="checkbox" name="consent" required/>
                    <span class="consent-note">Ich bin damit einverstanden, dass die abgesendeten Daten zum Zwecke der Übertragung gespeichert und verarbeitet werden. Mehr hierzu in unserer <a href="/impressum.html#Datenschutz">Datenschutzerklärung</a></span>
                    <button type="submit">Abschicken</button>
                </div>
            </form>
        </div>`;
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.injectCSS();
        this.shadowRoot.append(this.template.content);

        this.data.validated = {};
        this.completedCallback();
        this.listen('blur');
        this.listen('focus');
        this.listen('change');
        this.listen('submit');
    }

    events = [
        {
            type: 'blur',
            selector: 'input[type=email]',
            action: (ev) => this.validateInput(ev.target, validateNotEmpty, validateEmail),
        },
        {
            type: 'blur',
            selector: 'input[type=name]',
            action: (ev) => this.validateInput(ev.target, validateNotEmpty),
        },
        {
            type: 'blur',
            selector: 'textarea',
            action: (ev) => this.validateInput(ev.target, validateNotEmpty, validateMessageLength),
        },
        {
            type: 'focus',
            selector: 'input:not([type=checkbox]), textarea',
            action: (ev) => this.resetValidation(ev.target),
        },
        {
            type: 'change',
            selector: 'input[type=checkbox]',
            action: (ev) => {
                this.data.validated['consent'] = ev.target.checked;
            },
        },
        {
            type: 'submit',
            selector: 'form',
            action: (ev) => this.submit(ev),
        },
    ];

    validateInput(input, ...validationStrategies) {
        const { name, value } = input;
        const validations = validationStrategies.map((strategy) => strategy(value));
        const failed = validations.filter((val) => !val.validated);

        if (failed.length === 0) {
            this.data.validated[name] = true;
            this.data[name] = value;
            return;
        }

        this.data.validated[name] = false;
        input.setAttribute('error', true);
        input.parentElement.querySelector('.block-input-error').setAttribute('error', failed[0].message);
    }

    resetValidation(input) {
        this.data.validated[input.getAttribute('name')] = true;
        input.removeAttribute('error');
        input.parentElement.querySelector('.block-input-error').removeAttribute('error');
    }

    submit(ev) {
        ev.preventDefault();
        [...this.$$('input, textarea')].forEach((node) => {
            node.focus();
            node.blur();
        });

        const validated = Object.values(this.data.validated).every((val) => val === true);
        if (!validated) return;

        this.$('.block-submit button').disabled = true;
        this.sendMail(this.data);
    }

    async sendMail({ email, name, text: message }) {
        const { result, error } = await postMail(email, name, message);

        if (!error) {
            this.$('.block-submit button').setAttribute('success', true);
            this.$('.block-submit button').textContent = 'Abgeschickt!';
            return;
        }

        this.$('.block-submit button').setAttribute('error', true);
        this.$('.block-submit button').textContent = 'Fehler! Versuche es später erneut!';
    }

    updateComponent({ fields }) {
        const elements = fields.map(({ type, name }) => {
            this.data.validated[type] = false;

            const container = document.createElement('div');
            container.className = 'block-input-container';

            const label = document.createElement('label');
            label.className = 'block-label hidden';
            label.textContent = name;

            const error = document.createElement('span');
            error.className = 'block-input-error';

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
                    inputElement.type = type;
                    break;
            }

            inputElement.placeholder = (type === 'name' ? 'Dein' : 'Deine ') + name;
            inputElement.name = type;

            container.append(label, inputElement, error);
            return container;
        });

        this.render(elements, this.shadowRoot.querySelector('.block-fields'));
    }
}

customElements.define('j-contact', JContact);
