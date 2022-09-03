/** @format */
import { Controller } from './controller.mjs';
import { getFiles, postFile, deleteFile } from '../../shared/services/file.service.mjs';

class FileController extends Controller {
    events = [];
    constructor(selector) {
        super(selector);

        this.set('click');
    }
    async upload(file) {}
}

export const files = new FileController();
