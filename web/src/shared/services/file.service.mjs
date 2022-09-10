/** @format */

import { GET, POST, DELETE, PUT } from '../../shared/utils/requests.util.mjs';
import { useService } from './useService.mjs';

export const getFiles = async () => {
    const { error, result } = await useService(async () => {
        return await fetch(`/api/v1/files`, GET);
    });

    if (error) throw error;
    return result;
};

export const postFile = async (file) => {
    const { error, result } = await useService(async () => {
        return await fetch(`/api/v1/files`, {
            // @note - this workaround is necessary. Further investigation as to why set headers do not work when
            // uploading the file is needed
            method: 'POST',
            body: file,
        });
    });

    if (error) throw error;
    return result;
};

export const deleteFile = async (path) => {
    const body = JSON.stringify({ path });
    const { error, result } = await useService(async () => {
        return await fetch(`/api/v1/files`, { ...DELETE, body });
    });

    if (error) throw error;
    return result;
};
