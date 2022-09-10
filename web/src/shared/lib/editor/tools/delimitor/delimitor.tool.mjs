/** @format */

import { delimitor } from 'pangolicons';
import './delimitor.css';

export class Delimiter {
    static get toolbox() {
        return {
            title: 'Delimiter',
            icon: delimitor.toString({ 'stroke-width': 2.5 }),
        };
    }

    render() {
        const delimitor = document.createElement('hr');
        delimitor.className = 'editor-delimitor';
        return delimitor;
    }

    save(blockContent) {
        return {};
    }
}
