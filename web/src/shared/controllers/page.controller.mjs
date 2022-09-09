/** @format */

import { Controller } from '../../dashboard/controllers/controller.mjs';
import { getPage, getPages } from '../services/page.service.mjs';

class PageController extends Controller {
    constructor(selector) {
        super(selector);
        this.navigation = document.querySelector(selector);
    }

    async init(router, injector) {
        this.router = router;
        this.injector = injector;
    }

    async constructRoutingTable() {
        // retrieve page data from the backend
        this.pages = await getPages();

        this.router.reset();
        this.activePages = this.pages.filter((elem) => elem.active).sort((a, b) => a.index - b.index);
        this.activePages.forEach(({ title, dest, content, headerImage }) => {
            this.router.create(dest, {
                dest,
                title: `JuZe Sauerlach | ${title}`,
                callback: (query, route) => {
                    this.injector(content, route, query);
                    const image = document.querySelector('#header-image');
                    if (image) image.src = headerImage;
                },
            });
        });

        this.setNavigation();
        this.router.goTo('#home');
    }

    setNavigation() {
        this.navigation?.setAttribute(
            'data',
            JSON.stringify(
                this.activePages.map(({ title, tooltip, dest, icon }) => {
                    return { title, tooltip, dest, icon };
                })
            )
        );
    }

    getActiveRouteData({ dest }) {
        const activeRoute = this.activePages.find((route) => route.dest === dest);
        return activeRoute;
    }

    getSelectedRouteData({ dest }) {
        return this.pages.find((route) => route.dest === dest);
    }

    getPages() {
        return this.pages;
    }
}

export const page = new PageController('j-navigation');
