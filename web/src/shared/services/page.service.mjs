/** @format */

import { GET, POST, DELETE, PUT } from '../../shared/utils/requests.util.mjs';
import { useService } from './useService.mjs';

export const getPage = async (id) => {
    const { error, result } = await useService(async () => {
        return await fetch(`/api/v1/page/${id}`, GET);
    });

    if (error) throw error;
    return result;
};

export const getPages = async () => {
    const { error, result } = await useService(async () => {
        return await fetch(`/api/v1/page/`, GET);
    });

    if (error) throw error;
    return result;
};

export const createPage = async (page) => {
    const body = JSON.stringify(page);
    const { error, result } = await useService(async () => {
        return await fetch(`/api/v1/page/`, { ...POST, body });
    });

    if (error) throw error;
    return result;
};

export const updatePage = async (id, page) => {
    const body = JSON.stringify(page);
    const { error, result } = await useService(async () => {
        return await fetch(`/api/v1/page/${id}`, { ...PUT, body });
    });
    if (error) throw error;
    return result;
};

export const deletePage = async (id) => {
    const { error, result } = await useService(async () => {
        return await fetch(`/api/v1/page/${id}`, DELETE);
    });

    if (error) throw error;
    return result;
};

export const getContent = async (id) => {
    const { error, result } = await useService(async () => {
        return await fetch(`/api/v1/page/${id}/content`, GET);
    });

    if (error) throw error;
    return result;
};

export const updateContent = async (id, content) => {
    const body = JSON.stringify(content);
    const { error, result } = await createService(async () => {
        return await fetch(`/api/v1/page/${id}/content`, { ...PUT, body });
    });

    if (error) throw error;
    return result;
};
