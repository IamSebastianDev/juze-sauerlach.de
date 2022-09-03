/** @format */

import './lib/components/components.loader.mjs';
import { page } from '../shared/controllers/page.controller.mjs';
import { dispatch } from 'straemjs';
import Røut from '../shared/røut.mjs';
import { routerConfig } from '../shared/configs/router.config.mjs';
import { contentParser } from './lib/parser/contentParser.mjs';
import { elementDictionary } from './lib/parser/elementDictionary.mjs';

window.addEventListener('DOMContentLoaded', async () => {
    await page.init();
    const routes = page.getRoutes(contentParser(elementDictionary, document.querySelector('#content')));
    const router = new Røut(routes, routerConfig);
    router.goTo('#home');

    dispatch('page-complete').from(window).with({});
});
