/** @format */

import { Core } from '../../../../shared/lib/components/core/core.component.mjs';
import './file-upload.css';
import Icons from '../../../../shared/utils/icons.util.mjs';
import { iconConfig } from '../../../../shared/configs/icons.config.mjs';
const { file, convertToLink, circlePlus, checkmarkCircle, circleX } = Icons.icons;

class JFileUpload extends Core {
    constructor() {
        super();
        this.template = document.createElement('template');
        this.template.innerHTML = this.html`
            <div class="upload-container">
                <form>
                    <label id="file-target" for="file-upload">
                        <input type="file" id="file-upload" name="file-upload" accept=".png,.jpg,.jpeg,.gif,.bmp,.pdf"/>
                        <span class="icon-outlet"></span>
                        <span class="text-outlet"></span>
                    </label>
                    <button class="upload-button" disabled type="submit"></button>
                </form>
            </div>
        `;
    }

    events = [
        {
            type: 'dragover',
            selector: '#file-target',
            action: (ev) => this.handleDragOver(ev),
        },
        {
            type: 'dragleave',
            selector: '#file-target',
            action: (ev) => this.handleDragLeave(ev),
        },
        {
            type: 'drop',
            selector: '#file-target',
            action: (ev) => this.handleDrop(ev),
        },
        {
            type: 'submit',
            selector: 'form',
            action: (ev) => this.handleSubmit(ev),
        },
    ];

    handleDragOver(ev) {
        this.$('#file-target').classList.add('drag-over');
    }

    handleDragLeave(ev) {
        this.$('#file-target').classList.remove('drag-over');
    }

    handleDrop(ev) {
        const { files } = ev.dataTransfer;
        this.$('#file-target').classList.remove('drag-over');

        if (files.length === 0) return;
        const file = files[0];
        const validated = this.validateFileName(file.name);

        if (!validated) {
            this.$('button').disabled;
            this.$('.text-outlet').textContent = 'Dieser Dateityp wird nicht unterstützt.';
            this.$('.icon-outlet').firstElementChild.replaceWith(
                circleX.toSvg({ ...iconConfig, width: 24, height: 24, 'stroke-width': 1.5 })
            );
            return;
        }

        this.$('button').disabled = false;
        this.$('.text-outlet').textContent = file.name;
        this.$('.icon-outlet').firstElementChild.replaceWith(
            checkmarkCircle.toSvg({ ...iconConfig, width: 24, height: 24, 'stroke-width': 1.5 })
        );

        this.file = file;
    }

    handleSubmit(ev) {
        const file = new FormData();
        file.append('file', this.file);
        this.emit('upload-file', { file });
    }

    validateFileName(fileName) {
        const [ext, ...rest] = fileName.split('.').reverse();
        return ext.match(/jpg|jpeg|png|gif|pdf/gim);
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.injectCSS();
        this.shadowRoot.append(this.template.content);

        this.$('.icon-outlet').append(circlePlus.toSvg({ ...iconConfig, width: 24, height: 24, 'stroke-width': 1.5 }));
        this.$('.text-outlet').textContent = 'Drag & Drop oder drücke hier um eine Datei hochzuladen.';
        this.$('button').textContent = 'Datei hochladen';

        this.listen('click');
        this.listen('dragover', { stopPropagation: true, preventDefault: true });
        this.listen('dragleave', { stopPropagation: true, preventDefault: true });
        this.listen('drop', { stopPropagation: true, preventDefault: true });
        this.listen('submit', { preventDefault: true });
    }
}

customElements.define('j-file-upload', JFileUpload);
