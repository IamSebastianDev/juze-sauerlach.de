/** @format */

export class Core extends HTMLElement {
    constructor() {
        super();
    }
    injectCSS(path) {
        if (!this.template) return;
        this.template.innerHTML = `<style>@import "${path}"</style>` + this.template.innerHTML;
    }
}
