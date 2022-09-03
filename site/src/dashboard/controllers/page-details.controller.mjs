/** @format */

import { Controller } from './controller.mjs';
import { modalService } from '../services/modal.service.mjs';
import { updatePage, updateContent, createPage, deletePage } from '../../shared/services/page.service.mjs';
import { editor } from '../lib/editor/editor.mjs';

export class PageDetailsController extends Controller {
    events = [
        {
            type: 'click',
            selector: 'button#set-icon',
            action: (ev) => {
                console.log({ ev });
            },
        },
        {
            type: 'click',
            selector: 'button#organize-page',
            action: (ev) => {
                // open modal
            },
        },
        {
            type: 'click',
            selector: 'button#update-page',
            action: async (ev) => {
                let error = null,
                    result;
                // gather dataset
                const id = this.currentPageId;
                const dest = this.dest.value;
                const title = this.title.value;
                const tooltip = this.tooltip.value;
                const content = await editor.save();

                try {
                    result = await updatePage(id, { dest, title, tooltip, content });
                } catch (e) {
                    error = e;
                }
            },
        },
        {
            type: 'click',
            selector: 'button#create-page',
            action: (ev) => {
                console.log(ev);
            },
        },
    ];

    constructor(selector) {
        super(selector);

        this.pageOrganizer = document.querySelector(selector);
        this.set('click');

        this.title = this.$('input#page-title');
        this.dest = this.$('input#page-dest');
        this.tooltip = this.$('input#page-tooltip');
    }

    injectRouterData({ title, dest, tooltip, icon, _id }) {
        this.title.value = title;
        this.dest.value = dest;
        this.tooltip.value = tooltip;

        this.currentPageId = _id;
        this.currentPageIcon = icon;
    }
}

export const pageDetails = new PageDetailsController('section#page-details');
