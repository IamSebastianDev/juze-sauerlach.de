/** @format */

export const injectEditorData = (editor) => (content, route, query) => {
    if (!content || !content.blocks) return;
    editor.blocks.render(content);
};
