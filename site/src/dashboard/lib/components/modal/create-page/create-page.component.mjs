/** @format */

import { Core } from '../../../../../shared/lib/components/core/core.component.mjs';
import './create-page.css';
import Pangolicons from '../../../../../shared/utils/icons.util.mjs';
const { infoCircle } = Pangolicons.icons;
import { iconConfig } from '../../../../../shared/configs/icons.config.mjs';
import { Validate } from '../../../../../shared/utils/validation.util.mjs';

const notEmpty = Validate.createStrategy(Validate.StringNotEmpty, 'Dieses Feld kann nicht leer sein.');
const hasLength = Validate.createStrategy(
    Validate.StringHasLength(5),
    'Deine Eingabe sollte mehr als 5 Zeichen haben.'
);

class JModalCreatePage extends Core {
    constructor() {
        super();
        this.template = document.createElement('template');
        this.template.innerHTML = this.html`
            <div class="modal-container">
                <h3>Neue Seite erstellen:</h3>
                <div class="modal-input-container">
                    <label for="input-titel">Titel</label>
                    <input id="input-titel" name="title" type="text" placeholder="Titel"/>
                    <span class="modal-input-tooltip" tooltip="Der Titel der Seite wird in der Topleiste und dem Menü angezeigt.">
                        ${infoCircle.toString({ ...iconConfig, 'stroke-width': 1.5 })}
                    </span>
                    <div class="modal-input-error"></div>
                </div>
                <div class="modal-input-container">
                    <label for="input-tooltip">Tooltip</label>
                    <input id="input-tooltip" name="tooltip" type="text" placeholder="Tooltip"/>
                    <span class="modal-input-tooltip" tooltip="Der Tooltip wird beim Hover über den Menü icons angezeigt">
                        ${infoCircle.toString({ ...iconConfig, 'stroke-width': 1.5 })}
                    </span>
                    <div class="modal-input-error"></div>
                </div>
                <div class="modal-input-container">
                    <label for="input-url">URL</label>
                    <input id="input-url" name="dest" type="text" placeholder="#example"/>
                    <span class="modal-input-tooltip" tooltip="Die URL der Seite wird zur Navigation benutzt.">
                        ${infoCircle.toString({ ...iconConfig, 'stroke-width': 1.5 })}
                    </span>
                    <div class="modal-input-error"></div>
                </div>
                <div class="icon-selector">
                    <span>Icon auswählen:</span>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.injectCSS();
        this.shadowRoot.append(this.template.content);

        this.data.validated = {};
        this.listen('blur');
        this.listen('focus');

        this.iconSelector = document.createElement('j-icon-select');
        this.iconSelector.data.selectedIcon = this.data.selectedIcon;
        this.$('.icon-selector').append(this.iconSelector);

        this.iconSelector.output('selected', ({ name }) => {
            this.data.selectedIcon = name;
        });
    }

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
        input.parentElement.querySelector('.modal-input-error').setAttribute('error', failed[0].message);
    }

    resetValidation(ev) {
        this.data.validated[ev.target.getAttribute('name')] = true;
        ev.target.removeAttribute('error');
        ev.target.parentElement.querySelector('.modal-input-error').removeAttribute('error');
    }

    events = [
        {
            type: 'blur',
            selector: 'input#input-titel',
            action: (ev) => {
                this.validateInput(ev.target, notEmpty);
            },
        },
        {
            type: 'blur',
            selector: 'input#input-tooltip',
            action: (ev) => {
                this.validateInput(ev.target, notEmpty, hasLength);
            },
        },
        {
            type: 'blur',
            selector: 'input#input-url',
            action: (ev) => {
                this.validateInput(ev.target, notEmpty);
            },
        },
        {
            type: 'focus',
            selector: 'input#input-titel',
            action: (ev) => {
                this.resetValidation(ev);
            },
        },
        {
            type: 'focus',
            selector: 'input#input-tooltip',
            action: (ev) => {
                this.resetValidation(ev);
            },
        },
        {
            type: 'focus',
            selector: 'input#input-url',
            action: (ev) => {
                this.resetValidation(ev);
            },
        },
    ];
}

customElements.define('j-modal-create-page', JModalCreatePage);
