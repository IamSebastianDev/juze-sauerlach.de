/** @format */

import { delimitor } from 'pangolicons';

export class Delimiter {
    static get toolbox() {
        return {
            title: 'Delimiter',
            icon: delimitor.toString({ 'stroke-width': 2.5 }),
        };
    }

    render() {
        return document.createElement('hr');
    }

    save(blockContent) {
        return {};
    }
}
