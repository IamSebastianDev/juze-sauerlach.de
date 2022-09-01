/** @format */

import { image, x, resizeImage } from 'pangolicons';
import './image.css';

export class Image {
    static get toolbox() {
        return {
            title: 'Image',
            icon: image.toString({ 'stroke-width': 2.5, fill: 'transparent' }),
        };
    }

    constructor({ data }) {
        this.container = undefined;
        this.data = {
            url: data.url || '',
            caption: data.caption || '',
            stretched: data.stretched !== undefined ? data.stretched : false,
        };
        this.settings = [
            {
                name: 'stretched',
                icon: resizeImage.toString({ 'stroke-width': 2.5, width: 16, height: 16 }),
            },
        ];
    }

    renderSettings() {
        const wrapper = document.createElement('div');

        this.settings.forEach((tune) => {
            let button = document.createElement('div');

            button.classList.add('cdx-settings-button');
            button.classList.toggle('cdx-settings-button--active', this.data[tune.name]);
            button.innerHTML = tune.icon;
            wrapper.appendChild(button);

            button.addEventListener('click', () => {
                this._toggleTune(tune.name);
                button.classList.toggle('cdx-settings-button--active');
            });
        });

        return wrapper;
    }

    render() {
        this.container = document.createElement('div');
        this.container.className = 'image-plugin-container';

        const controls = document.createElement('div');
        controls.className = 'image-controls-row';

        const input = document.createElement('input');
        input.value = this.data?.url || '';
        input.placeholder = 'Paste image URL';
        input.addEventListener('focusout', (ev) => {
            if (ev.target.value.trim() !== '') {
                this.container.append(...this.createImage(ev.target.value, this.data.caption));
            }
        });

        const removeButton = document.createElement('button');
        removeButton.className = 'contact-field-remove';
        removeButton.append(x.toSvg({ 'stroke-width': 2.5, width: 16, height: 16 }));
        removeButton.addEventListener('click', (ev) => {
            input.value = '';
            this.clearImage();
        });

        controls.append(input, removeButton);
        this.container.append(controls);
        this.data.url && this.container.append(...this.createImage(this.data.url, this.data.caption));
        return this.container;
    }

    clearImage() {
        this.container.querySelector('img')?.remove();
        this.container.querySelector('[contenteditable]')?.remove();
    }

    createImage(url, captionText) {
        this.clearImage();
        const image = document.createElement('img');
        image.src = url;

        const caption = document.createElement('div');
        caption.contentEditable = true;
        caption.innerHTML = captionText || 'Write a caption';

        this._acceptTuneView();

        return [image, caption];
    }

    save(blockContent) {
        return Object.assign(this.data, {
            url: blockContent.querySelector('img')?.src,
            caption: blockContent.querySelector('[contenteditable]')?.innerHTML,
        });
    }

    validate(savedData) {
        if (!savedData.url.trim()) {
            return false;
        }

        return true;
    }

    _toggleTune(tune) {
        this.data[tune] = !this.data[tune];
        this._acceptTuneView();
    }

    _acceptTuneView() {
        this.settings.forEach((tune) => {
            console.log({ tune });
            this.container.classList.toggle(tune.name, !!this.data[tune.name]);
        });
    }
}
