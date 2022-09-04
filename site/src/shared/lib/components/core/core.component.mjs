/** @format */

import { receive, dispatch } from 'straemjs';

export class Core extends HTMLElement {
    constructor() {
        super();
        this.data = {};
    }

    $(selector) {
        return this.shadowRoot.querySelector(selector);
    }

    $$(selector) {
        return this.shadowRoot.querySelectorAll(selector);
    }

    html(strings, ...args) {
        return strings
            .map((string, i) => {
                return i < args.length ? string + args[i] : string;
            })
            .join('');
    }

    injectCSS() {
        if (!this.template) return;
        const location = window.location.pathname !== '/dashboard' ? 'frontend' : 'dashboard';
        this.template.innerHTML =
            `<style>@import "./dist/components.${location}.css"</style>` + this.template.innerHTML;
    }

    listen(eventType) {
        this.shadowRoot.addEventListener(
            eventType,
            (ev) => {
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

    emit(eventName, payload) {
        dispatch(eventName).from(this).with(payload);
    }

    output(eventName, callback) {
        receive(eventName)
            .from(this)
            .then(({ detail }) => callback(detail));
    }
}
