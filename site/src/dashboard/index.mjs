/** @format */

import { dispatch } from 'straemjs';
import './lib/components/components.loader.mjs';
import Røut from '../shared/røut.mjs';
import { routerConfig } from '../shared/configs/router.config.mjs';
import Pangolicons from '../shared/utils/icons.util.mjs';

import { editor } from './lib/editor/editor.mjs';
import { injector } from './lib/editor/injector.mjs';
import { page } from '../shared/controllers/page.controller.mjs';
import { pageDetails } from './controllers/page-details.controller.mjs';
import './controllers/sidebar.controller.mjs';

const injectPageDetails = (_, route) => {
    pageDetails.injectRouterData(page.getActiveRouteData(route));
};

window.addEventListener('DOMContentLoaded', async () => {
    Pangolicons.replaceAll();

    await editor.isReady;
    await page.init();
    const routes = page.getRoutes(injector(editor, injectPageDetails));
    const router = new Røut(routes, routerConfig);
    router.goTo('#home');

    dispatch('page-complete').from(window).with({});
});
