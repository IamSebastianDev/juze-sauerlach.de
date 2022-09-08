/** @format */

export class Controller {
    constructor(selector) {
        this.selector = selector;
        this._element = document.querySelector(selector);

        if (!this._element) console.warn(`${selector} does not exist!`);
    }

    $(selector) {
        return this._element.querySelector(selector);
    }
    $$(selector) {
        return this._element.querySelectorAll(selector);
    }

    getValue(selector) {
        return this.$(selector)?.value;
    }

    listen(eventType, { stopPropagation, preventDefault } = {}) {
        this._element.addEventListener(
            eventType,
            (ev) => {
                preventDefault && ev.preventDefault();
                stopPropagation && ev.stopPropagation();
                this.checkEventTargets(ev, eventType);
            },
            true
        );
    }

    checkEventTargets(ev, eventType) {
        this.events.forEach(({ type, action, selector }) => {
            if (eventType !== type) return;
            if (ev.target.closest(selector)) action(ev);
        });
    }
}
