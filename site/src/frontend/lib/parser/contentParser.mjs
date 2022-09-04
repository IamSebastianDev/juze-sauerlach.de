/** @format */

export const contentParser = (dictionary, target) => (content) => {
    if (!target) return;
    const { blocks } = content;

    const elements = blocks.map(({ id, type, data, tunes }) => {
        const element = document.createElement(dictionary[type]);
        element.id = id;
        element.setAttribute('data', JSON.stringify({ ...data, ...tunes }));
        return element;
    });

    [...target.childNodes].forEach((node) => node.remove());
    target.append(...elements);
};
