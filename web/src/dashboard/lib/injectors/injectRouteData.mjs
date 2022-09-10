/** @format */

import { pageDetails } from '../../controllers/page-details.controller.mjs';
import { page } from '../../../shared/controllers/page.controller.mjs';

export const injectRouteData = () => (content, route, query) => {
    pageDetails.injectRouterData(page.getSelectedRouteData(route));
};
