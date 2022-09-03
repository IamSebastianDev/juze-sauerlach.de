/** @format */

export const injector = (editor, routeHasChanged) => (content, route, query) => {
    if (!content || !content.blocks) return;
    editor.blocks.render(content);
    routeHasChanged(content, route, query);
};
