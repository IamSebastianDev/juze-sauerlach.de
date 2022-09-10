/** @format */

export const useService = async (asyncCallback) => {
    let error = null,
        result;

    try {
        const response = await asyncCallback();
        result = await response.json();
    } catch (e) {
        error = e;
    }

    return { error, result };
};
