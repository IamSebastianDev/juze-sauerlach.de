/** @format */
import { envelope, plus, x } from 'pangolicons';
import './contact.css';

export class Contact {
    constructor({ data }) {
        this.data = data;
    }

    static get toolbox() {
        return {
            title: 'Contact',
            icon: envelope.toString({ 'stroke-width': 2.5 }),
        };
    }

    render() {
        const container = document.createElement('div');
        container.className = 'contact-plugin-container';

        const emptyFieldSet = document.createElement('div');
        emptyFieldSet.className = 'contact-field-container';

        const nameSelector = document.createElement('input');
        nameSelector.placeholder = 'Enter a name for the input field';
        nameSelector.type = 'text';

        const typeSelector = document.createElement('select');
        typeSelector.placeholder = 'Type of the input field';
        ['email', 'name', 'text'].forEach((value) => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            typeSelector.appendChild(option);
        });
        const removeButton = document.createElement('button');
        removeButton.className = 'contact-field-remove';
        removeButton.append(x.toSvg({ 'stroke-width': 2.5, width: 16, height: 16 }));
        emptyFieldSet.append(nameSelector, typeSelector, removeButton);
        container.addEventListener('click', (ev) => {
            if (!ev.target.closest('.contact-field-remove')) return;
            const fieldSet = ev.target.closest('.contact-field-remove').parentElement;
            fields.splice(fields.indexOf(fieldSet), 1);
            renderFields();
        });

        const addFieldButton = document.createElement('button');
        addFieldButton.className = 'contact-field-add';
        addFieldButton.appendChild(plus.toSvg({ 'stroke-width': 2.5, width: 16, height: 16 }));

        let fields = this.data?.fields
            ? [...this.data.fields.map((val) => this.deserialize(val, emptyFieldSet))]
            : [emptyFieldSet.cloneNode(true)];
        const renderFields = () => {
            [...container.childNodes].forEach((node) => node.remove());
            container.append(...fields, addFieldButton);
        };

        addFieldButton.addEventListener('click', (ev) => {
            fields.push(emptyFieldSet.cloneNode(true));
            renderFields();
        });

        container.append(...fields, addFieldButton);
        return container;
    }

    save(blockContent) {
        const fields = blockContent.querySelectorAll('.contact-field-container');
        return {
            fields: [...fields].map(this.serialize),
        };
    }

    serialize(field) {
        return {
            name: field.querySelector('input').value,
            type: field.querySelector('select').value,
        };
    }

    deserialize({ name, type }, emptyFieldSet) {
        const fieldSet = emptyFieldSet.cloneNode(true);
        fieldSet.querySelector('input').value = name;
        fieldSet.querySelector('select').value = type;
        return fieldSet;
    }

    validate(savedData) {
        if (savedData.fields.length === 0) {
            return false;
        }

        return true;
    }
}
