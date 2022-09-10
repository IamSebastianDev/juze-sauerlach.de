/** @format */
import { Controller } from './controller.mjs';
import { getFiles, postFile, deleteFile } from '../../shared/services/file.service.mjs';
import { modalService } from '../services/modal.service.mjs';
import { messageService } from '../services/messages.service.mjs';
import { copyToClipboard } from '../../shared/utils/copy.util.mjs';

class FileController extends Controller {
    events = [
        {
            type: 'click',
            selector: 'button[target]',
            action: (ev) => this.handleBrowserSwitch(ev),
        },
        {
            type: 'click',
            selector: 'button#set-fullscreen',
            action: (ev) => {
                const modal = modalService.get('file-modal', { data: { files: this.files } });
                modal.open({ isFullscreen: true });
            },
        },
        {
            type: 'upload-file',
            selector: 'j-file-upload',
            action: ({ detail }) => this.upload(detail),
        },
    ];

    constructor(selector) {
        super(selector);
        this.browserOutlet = this._element;

        this.renderTarget = document.createElement('j-file-browser-outlet');
        this.renderTarget.output('onClick', ({ data }) => this.handleCardClick(data));
        this.$('#file-browser-outlet').append(this.renderTarget);
        this.getFiles();

        this.listen('click');
        this.listen('upload-file');
    }

    async init() {
        await this.getFiles();
    }

    async handleCardClick(data) {
        let result = await copyToClipboard(data.path);
        if (result === false) {
            messageService.dispatch({ type: 'error', text: 'Kopieren fehlgeschlagen.' });
        } else {
            messageService.dispatch({ type: 'success', text: 'Pfad kopiert.' });
        }
    }

    async getFiles() {
        this.files = await getFiles();
        this.renderFilesToOutlet('images');
    }

    handleBrowserSwitch(ev) {
        const type = ev.target.getAttribute('target');
        this.renderFilesToOutlet(type);
    }

    renderFilesToOutlet(type) {
        [...this.$$('[target]')].forEach((node) => node.classList.remove('active'));
        this.$(`button[target=${type}]`).classList.add('active');
        const files = this.files[type];
        this.renderTarget.setAttribute('data', JSON.stringify({ files, type }));
    }

    async upload({ file }) {
        try {
            await postFile(file);
            await this.getFiles();
            messageService.dispatch({ type: 'success', text: 'Datei erfolgreich hochgeladen.' });
        } catch (e) {
            messageService.dispatch({ type: 'error', text: `Fehler beim hochladen der Datei: ${e}` });
        }
    }
}

export const files = new FileController('#file-control');
