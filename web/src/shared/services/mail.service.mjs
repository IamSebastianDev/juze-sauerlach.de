/** @format */

import { POST } from '../../shared/utils/requests.util.mjs';
import { useService } from './useService.mjs';

export const postMail = async (email, name, message) => {
    const body = JSON.stringify({ email, name, message });
    const { error, result } = await useService(async () => {
        return await fetch(`/api/v1/mail`, { ...POST, body });
    });

    if (error) throw error;
    return result;
};
