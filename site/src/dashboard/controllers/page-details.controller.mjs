/** @format */

import { Controller } from './controller.mjs';
import { modalService } from '../services/modal.service.mjs';
import { updatePage, updateContent, createPage, deletePage } from '../../shared/services/page.service.mjs';
import { editor } from '../lib/editor/editor.mjs';
import { messageService } from '../services/messages.service.mjs';
import { page } from '../../shared/controllers/page.controller.mjs';

export class PageDetailsController extends Controller {
    events = [
        {
            type: 'click',
            selector: 'button#select-icon',
            action: (ev) => {
                const modal = modalService.get('select-icon', { data: { icon: this.icon } });
                modal.onConfirm(({ data }) => {
                    this.updateIcon(data, modal.close);
                });
                modal.open();
            },
        },
        {
            type: 'click',
            selector: 'button#organize-page',
            action: (ev) => {
                const modal = modalService.get('organize-pages', { data: { pages: page.getPages() } });
                modal.onConfirm(({ data }) => {
                    this.updatePages(data, modal.close);
                });
                modal.open();
            },
        },
        {
            type: 'click',
            selector: 'button#update-page',
            action: (ev) => {
                this.saveCurrentPage(ev);
            },
        },
        {
            type: 'click',
            selector: 'button#create-page',
            action: (ev) => {
                const modal = modalService.get('create-page');
                modal.onConfirm(({ data }) => {
                    this.createNewPage(data, modal.close);
                });
                modal.open();
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

    injectRouterData({ title, dest, tooltip, icon, _id, index, active }) {
        this.title.value = title;
        this.dest.value = dest;
        this.tooltip.value = tooltip;

        this.routeId = _id;
        this.index = index;
        this.icon = icon;
        this.isActive = active;
    }

    async saveCurrentPage(ev) {
        console.log(this.icon);
        // gather dataset
        const pageData = {
            dest: this.dest.value,
            title: this.title.value,
            tooltip: this.tooltip.value,
            index: this.index,
            icon: this.icon,
            active: this.isActive,
            content: await editor.save(),
        };

        try {
            const { result, page: newPageData } = await updatePage(this.routeId, pageData);
            page.updateRouteData(this.routeId, newPageData);
            messageService.dispatch({ type: 'success', text: 'Speichern erfolgreich' });
        } catch (e) {
            messageService.dispatch({ type: 'error', text: `Fehler beim speichern der Seite: ${e}` });
        }
    }

    async createNewPage(data, complete) {
        const { title, tooltip, dest, selectedIcon: icon, validated } = data;
        console.log({ title, tooltip, dest, icon, validated });

        if (!icon) {
            messageService.dispatch({ type: 'error', text: 'Bitte wähle ein icon aus.' });
            return;
        }

        if (title === undefined || tooltip === undefined || dest === undefined) {
            messageService.dispatch({ type: 'error', text: 'Bitte fülle alle Felder aus.' });
            return;
        }

        if (!validated.title || !validated.tooltip || !validated.dest) {
            return;
        }

        try {
            const { result } = await createPage({ title, dest, tooltip, icon });
            console.log({ result });
        } catch (e) {
            messageService.dispatch({ type: 'error', text: `Fehler beim erstellen der Seite: ${e}` });
        } finally {
            complete();
        }
    }

    async updatePages(data, complete) {
        console.log({ data });
    }

    async updateIcon({ selectedIcon }, complete) {
        if (!selectedIcon) {
            messageService.dispatch({ type: 'error', text: 'Bitte wähle ein Icon aus.' });
            return;
        }

        this.icon = selectedIcon;

        try {
            const { result, page: newPageData } = await updatePage(this.routeId, { icon: selectedIcon });
            page.updateRouteData(this.routeId, newPageData);
            messageService.dispatch({ type: 'success', text: 'Speichern erfolgreich' });
        } catch (e) {
            messageService.dispatch({ type: 'error', text: `Fehler beim speichern der Seite: ${e}` });
        } finally {
            complete();
        }
    }
}

export const pageDetails = new PageDetailsController('section#page-details');
