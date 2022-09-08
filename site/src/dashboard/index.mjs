/** @format */

import { dispatch } from 'straemjs';
import './lib/components/components.loader.mjs';
import Røut from '../shared/røut.mjs';
import { routerConfig } from '../shared/configs/router.config.mjs';
import Pangolicons from '../shared/utils/icons.util.mjs';

import { editor } from './lib/editor/editor.mjs';

import { page } from '../shared/controllers/page.controller.mjs';
import './controllers/sidebar.controller.mjs';
import { files } from './controllers/file.controller.mjs';

import { injector } from './lib/injectors/injector.mjs';
import { injectEditorData } from './lib/injectors/injectEditorData.mjs';
import { injectRouteData } from './lib/injectors/injectRouteData.mjs';

window.addEventListener('DOMContentLoaded', async () => {
    Pangolicons.replaceAll();
    await files.getFiles();

    await editor.isReady;
    await page.init();
    const routes = page.getRoutes(injector(injectEditorData(editor), injectRouteData()));
    const router = new Røut(routes, routerConfig);
    router.goTo('#home');

    dispatch('page-complete').from(window).with({});
});
