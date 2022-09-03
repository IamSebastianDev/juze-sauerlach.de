/** @format */

export class Core extends HTMLElement {
    constructor() {
        super();
    }
    injectCSS() {
        if (!this.template) return;
        const location = window.location.pathname !== '/dashboard' ? 'frontend' : 'dashboard';
        this.template.innerHTML =
            `<style>@import "./dist/components.${location}.css"</style>` + this.template.innerHTML;
    }
}
