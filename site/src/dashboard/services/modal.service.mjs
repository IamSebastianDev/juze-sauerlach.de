/** @format */

class ModalService {
    constructor(selector) {
        this.outlet = document.querySelector(selector);
    }

    modals = {
        'create-page': 'j-modal-create-page',
        'select-icon': 'j-modal-select-icon',
        'organize-pages': 'j-modal-organize-pages',
    };

    get(modal, { data } = { data: {} }) {
        const _modal = document.createElement('j-modal-shell');
        _modal.setAttribute('inject', this.modals[modal]);
        _modal.data = data;
        this.outlet.append(_modal);

        return {
            open: () => {
                _modal.open();
            },
            close: () => {
                _modal.close();
            },
            onConfirm: (callback) => {
                _modal.onConfirm = callback;
            },
            onClose: (callback) => {
                _modal.onClose = callback;
            },
        };
    }
}

export const modalService = new ModalService('#modal-outlet');
