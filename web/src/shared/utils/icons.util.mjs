/** @format */

const Icon = ({ path, tags = [], name }) => {
    const defaultAttributes = {
        xmlns: 'http://www.w3.org/2000/svg',
        width: '24',
        height: '24',
        viewBox: '0 0 24 24',
        stroke: 'currentColor',
        fill: 'none',
        'stroke-linecap': 'round',
        'stroke-width': '1.5',
        'stroke-linejoin': 'round',
        'stroke-align': 'center',
    };

    /**
     *
     *  @public @method
     *  @description method to create a svg element displaying the icon using the supplied attributes and the
     *  defaultAttributes
     *
     *  @param { {} } attributes - the attributes passed to the method
     *
     *  @returns { SVGElement } the created Element
     *
     */

    const toSvg = (attributes = {}) => {
        // create the svg element

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

        /*
            Create a new Object containing the default attributes for the svg, the className, and all attributes passed to the method creating the element.
        */

        const attributesToAssign = {
            ...defaultAttributes,
            class: `pangolicons pangolicons-${name} ${attributes.class ? attributes.class : ''}`,
            ...attributes,
        };

        /*
            Iterate over the attributes and assign them to the SVG Element
        */

        for (const attributeName in attributesToAssign) {
            if (Object.hasOwnProperty.call(attributesToAssign, attributeName)) {
                const attribute = attributesToAssign[attributeName];

                svg.setAttribute(attributeName, attribute);
            }
        }

        // add the definition to the svg element

        svg.innerHTML = path;

        // return the created svg

        return svg;
    };

    /**
     *
     *  @public @method
     *  @description method to create a svg string displaying the icon using the supplied attributes and the
     *  defaultAttributes
     *
     *  @param { {} } attributes - the attributes passed to the method
     *
     *  @returns { String } the created Element's outerHTML
     *
     */

    const toString = (attributes = {}) => {
        const attributesToAssign = {
            ...defaultAttributes,
            class: `pangolicons pangolicons-${name} ${attributes.class ? attributes.class : ''}`,
            ...attributes,
        };

        // create the attribute string by iterating over the created object and concatenating them to the string.
        let attributeString = '';

        for (const attributeName in attributesToAssign) {
            if (Object.hasOwnProperty.call(attributesToAssign, attributeName)) {
                const attribute = attributesToAssign[attributeName];
                attributeString += `${attributeName}="${attribute}" `;
            }
        }

        return `<svg ${attributeString}>${path}</svg>`;
    };

    return {
        name,
        path,
        tags,
        toString,
        toSvg,
    };
};

import { Pangolicons } from 'pangolicons';

Pangolicons.icons.house = Icon({
    path: '<path d="M3,20.7V9.63c0-.4,.18-.78,.5-1.02L11.2,2.62c.47-.36,1.13-.36,1.59,0l7.7,5.99c.32,.25,.5,.62,.5,1.02v11.07c0,.72-.58,1.3-1.3,1.3H4.3c-.72,0-1.3-.58-1.3-1.3Zm12,1.3V13.5h-6v8.5h6Z"/>',
    tags: ['house', 'flat', 'building'],
    name: 'house',
});
Pangolicons.icons.megaphone = Icon({
    path: '<path d="M2.88,14.54L16.46,5.03c.65-.46,1.56-.21,1.9,.51l2.99,6.41c.34,.72-.06,1.58-.83,1.79L4.51,18.02c-.6,.16-1.23-.13-1.5-.7l-.55-1.19c-.26-.57-.08-1.24,.43-1.6Zm3.46,2.99s4.82,6.37,7.56-2.02l-7.56,2.02Z"/>',
    tags: ['speaker', 'loud', 'vocals', 'megaphone'],
    name: 'megaphone',
});
Pangolicons.icons.send = Icon({
    path: '<path d="M20.43,3.5l-6.07,17-3.98-6.95L3.57,9.43,20.43,3.5Zm0,0L10.38,13.55,20.43,3.5Z"/>',
    tags: ['send', 'flyer', 'paper', 'craft'],
    name: 'send',
});

export default Pangolicons;
