/** @format */

import { Controller } from './controller.mjs';

export class SidebarController extends Controller {
    constructor(selector) {
        super(selector);

        this.sidebar = document.querySelector(selector);
        this.set('click');
    }

    events = [
        {
            type: 'click',
            selector: '#dashboard-cycle',
            action: (ev) => {
                const sidebarState = this.sidebar.getAttribute('state');
                this.sidebar.setAttribute('state', sidebarState === 'false' ? 'true' : 'false');
            },
        },
    ];
}

new SidebarController('aside#sidebar');
