/** @format */

import { getPages } from '../services/page.service.mjs';

class PageController {
    constructor() {
        this.navigation = document.querySelector('j-navigation');
    }

    async init() {
        const pages = await getPages();

        this.activePages = pages.filter((elem) => elem.active).sort((a, b) => a.index - b.index);
        this.navigationData = this.activePages.map(({ title, tooltip, dest, icon }) => {
            return { title, tooltip, dest, icon };
        });

        this.navigation?.setAttribute('data-nav', JSON.stringify(this.navigationData));
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
}

export const page = new PageController();
