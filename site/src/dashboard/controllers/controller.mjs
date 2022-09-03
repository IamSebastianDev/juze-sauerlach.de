/** @format */

export class Controller {
    constructor(selector) {
        this.selector = selector;
        this._element = document.querySelector(selector);

        if (!this._element) console.warning(`${selector} does not exist!`);
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

    set(eventType) {
        window.addEventListener(eventType, (ev) => {
            if (!ev.target.closest(this.selector)) return;
            this.checkEventTargets(ev, eventType);
        });
    }

    checkEventTargets(ev, eventType) {
        this.events.forEach(({ type, action, selector }) => {
            if (eventType !== type) return;
            if (ev.target.closest(selector)) action(ev);
        });
    }
}
