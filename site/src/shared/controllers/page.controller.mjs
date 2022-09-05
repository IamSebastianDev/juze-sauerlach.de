/** @format */

import { getPages } from '../services/page.service.mjs';

class PageController {
    constructor() {
        this.navigation = document.querySelector('j-navigation');
    }

    async init() {
        this.pages = await getPages();
        this.setNavigation();
    }

    setNavigation() {
        this.activePages = this.pages.filter((elem) => elem.active).sort((a, b) => a.index - b.index);
        const navigationData = this.activePages.map(({ title, tooltip, dest, icon }) => {
            return { title, tooltip, dest, icon };
        });
        this.navigation?.setAttribute('data-nav', JSON.stringify(navigationData));
    }

    getRoutes(routeCallback) {
        let routes = {};
        this.activePages.forEach(({ title, dest, content, headerImage }) => {
            routes[dest] = {
                title: `JuZe Sauerlach | ${title}`,
                callback: (query, route) => {
                    routeCallback(content, route, query);
                    const image = document.querySelector('#header-image');
                    if (image) image.src = headerImage;
                },
            };
        });
        return routes;
    }

    getActiveRouteData({ dest }) {
        const activeRoute = this.activePages.find((route) => route.dest === dest);
        return activeRoute;
    }

    getSelectedRouteData({ dest }) {
        const selectedRoute = this.pages.find((route) => route.dest === dest);
        return selectedRoute;
    }

    updateRouteData(id, pageData) {
        this.pages = this.pages.map((page) => {
            return page._id !== id ? page : { ...page, ...pageData };
        });
        this.setNavigation();
    }

    getPages() {
        return this.pages;
    }
}

export const page = new PageController();
