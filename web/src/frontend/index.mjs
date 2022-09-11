/** @format */

import './lib/components/components.loader.mjs';
import { page } from '../shared/controllers/page.controller.mjs';
import { dispatch } from 'straemjs';
import Røut from '../shared/lib/røut.mjs';
import { routerConfig } from '../shared/configs/router.config.mjs';
import { contentParser } from './lib/parser/contentParser.mjs';
import { elementDictionary } from './lib/parser/elementDictionary.mjs';
import Pangolicons from '../shared/utils/icons.util.mjs';

window.addEventListener('DOMContentLoaded', async () => {
    Pangolicons.replaceAll();

    const router = new Røut({}, routerConfig);
    await page.init(router, contentParser(elementDictionary, document.querySelector('#content')));
    await page.constructRoutingTable(window.location.hash);

    dispatch('page-complete').from(window).with({});
});
