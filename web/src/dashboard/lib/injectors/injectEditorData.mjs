/** @format */

export const injectEditorData = (editor) => (content, route, query) => {
    console.log({ content });
    if (!content || !content.blocks) return;

    if (content.blocks.length === 0) {
        editor.blocks.render({ blocks: [] });
        return;
    }

    editor.blocks.render(content);
};
