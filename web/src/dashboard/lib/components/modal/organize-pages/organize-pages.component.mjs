/** @format */

/** @format */

import { Core } from '../../../../../shared/lib/components/core/core.component.mjs';
import Icons from '../../../../../shared/utils/icons.util.mjs';
import { iconConfig } from '../../../../../shared/configs/icons.config.mjs';
const { icons } = Icons;
import './organize-pages.css';

class JModalOrganizePages extends Core {
    constructor() {
        super();
        this.template = document.createElement('template');
        this.template.innerHTML = this.html`
            <div class="modal-container">
                <h3>Seiten organisieren:</h3>
            </div>
            <div class="modal-drag-outlet">
                <ul class="modal-drag-list">

                </ul>
            </div>
        `;
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.injectCSS();
        this.shadowRoot.append(this.template.content);

        this.listen('dragstart', { stopPropagation: true });
        this.listen('dragend', { stopPropagation: true });
        this.listen('dragover', { stopPropagation: true, preventDefault: true });
        this.listen('dragenter', { stopPropagation: true, preventDefault: true });
        this.listen('dragleave', { stopPropagation: true, preventDefault: true });
        this.listen('drop', { stopPropagation: true });
        this.listen('change');

        this.render();
    }

    events = [
        {
            type: 'dragstart',
            selector: 'li[draggable]',
            action: (ev) => this.handleDragStart(ev),
        },
        {
            type: 'dragend',
            selector: 'li[draggable]',
            action: (ev) => this.handleDragEnd(ev),
        },
        {
            type: 'dragover',
            selector: 'li[draggable]',
            action: (ev) => this.handleDragOver(ev),
        },
        {
            type: 'dragleave',
            selector: 'li[draggable]',
            action: (ev) => this.handleDragLeave(ev),
        },
        {
            type: 'drop',
            selector: 'li[draggable]',
            action: (ev) => this.handleDrop(ev),
        },
        {
            type: 'change',
            selector: 'input[type=checkbox]',
            action: (ev) => this.handleChange(ev),
        },
    ];

    handleDragStart(ev) {
        ev.target.classList.add('dragged');
        ev.dataTransfer.setData('text/plain', ev.target.getAttribute('list-id'));
        ev.dataTransfer.dropEffect = 'move';
    }

    handleDragEnd(ev) {
        ev.target.classList.remove('dragged');
    }

    handleDragOver(ev) {
        ev.target.closest('li').classList.add('drag-over');
    }

    handleDragLeave(ev) {
        ev.target.closest('li').classList.remove('drag-over');
    }

    handleDrop(ev) {
        const droppedId = ev.target.closest('li[draggable]').getAttribute('list-id');
        const draggedId = ev.dataTransfer.getData('text/plain');

        [...this.$$('.drag-over')].forEach((node) => node.classList.remove('drag-over'));
        this.reorderPages({ droppedId, draggedId });
    }

    reorderPages({ droppedId, draggedId }) {
        const droppedIndex = this.data.pages.findIndex((page) => page._id === droppedId);
        const draggedIndex = this.data.pages.findIndex((page) => page._id === draggedId);

        this.data.pages.splice(droppedIndex, 0, this.data.pages.splice(draggedIndex, 1)[0]);
        this.$(`[list-id="${droppedId}"]`).after(this.$(`[list-id="${draggedId}"]`));
    }

    handleChange(ev) {
        const index = ev.target.closest('li').getAttribute('list-index');
        const name = ev.target.getAttribute('name');

        this.data.pages[index][name] = ev.target.checked;
        console.log(this.data.pages);
    }

    render() {
        [...this.$('.modal-drag-list').childNodes].forEach((node) => node.remove());
        const { pages } = this.data;
        this.draggables = pages.map((data, index) => {
            return this.html`
                <li 
                    draggable="true" 
                    list-index="${index}" 
                    list-id="${data._id}" 
                    class="draggable-list-item"
                >
                    <span class="draggable-list-title">${data.title}</span>
                    <div class="draggable-input-container">
                        <label for="${data.title}-set-active">
                            Aktivieren: 
                            <input 
                                id="${data.title}-set-active" 
                                name="active" 
                                type="checkbox" 
                                ${data.active ? 'checked' : ''}
                            />
                        </label>
                    </div>
                    <div class="draggable-input-container">
                    <label for="${data.title}-mark-delete">
                            Löschen: 
                            <input 
                                id="${data.title}-mark-delete" 
                                name="delete" 
                                type="checkbox"
                                ${data.delete ? 'checked' : ''}    
                            />
                        </label>
                    </div>
                    <span>
                        ${icons.verticalMore.toString({ ...iconConfig })}
                    </span>
                </li>
            `;
        });

        this.$('.modal-drag-list').innerHTML = this.draggables.join('\n');
    }
}

customElements.define('j-modal-organize-pages', JModalOrganizePages);
