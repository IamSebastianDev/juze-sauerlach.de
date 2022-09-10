/** @format */

export const injectEditorData = (editor) => (content, route, query) => {
    console.log({ content });
    if (!content || !content.blocks || content.blocks.length === 0) return;
    editor.blocks.render(content);
};
