/** @format */

export const injectEditorData = (editor) => (content, route, query) => {
    console.log({ content });
    if (!content || !content.blocks) return;

    if (content.blocks.length === 0) {
        editor.clear();
        return;
    }

    editor.blocks.render(content);
};
