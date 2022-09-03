/** @format */

import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import AlignmentTool from 'editorjs-text-alignment-blocktune';
import { Delimiter } from '../../shared/lib/editor/tools/delimitor/delimitor.tool.mjs';
import { Contact } from '../../shared/lib/editor/tools/contact/contact.tool.mjs';
import { Image } from '../../shared/lib/editor/tools/image/image.tool.mjs';

export const editor = new EditorJS({
    holder: 'editor',
    tools: {
        header: {
            class: Header,
            tunes: ['textAlign'],
        },
        paragraph: {
            class: Paragraph,
            inlineToolbar: true,
            tunes: ['textAlign'],
        },
        list: {
            class: List,
            inlineToolbar: true,
            config: {
                defaultStyle: 'unordered',
            },
        },
        quote: Quote,
        delimiter: Delimiter,
        contact: Contact,
        image: {
            class: Image,
            inlineToolbar: true,
            tunes: ['textAlign'],
        },
        Marker: {
            class: Marker,
            shortcut: 'CMD+SHIFT+M',
        },
        textAlign: {
            class: AlignmentTool,
            config: {
                default: 'left',
            },
        },
    },
    data: JSON.parse(window.localStorage.getItem('editor-temp')) || undefined,
});
