/** @format */

class ModalService {
    constructor(selector) {
        this.outlet = document.querySelector(selector);
    }

    modals = {
        'create-page': 'j-modal-create-page',
        'select-icon': 'j-modal-select-icon',
        'organize-pages': 'j-modal-organize-pages',
        'file-modal': 'j-modal-files',
    };

    get(modal, { data, actionItems } = {}) {
        const _modal = document.createElement('j-modal-shell');
        _modal.setAttribute('inject', this.modals[modal]);
        _modal.data = data || {};
        _modal.customActionItems = actionItems || [];
        this.outlet.append(_modal);

        return {
            open: ({ isFullscreen } = {}) => {
                _modal.open(isFullscreen);
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
