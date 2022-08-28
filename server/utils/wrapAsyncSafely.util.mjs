/** @format */

export const wrapAsyncSafely = async (operation) => {
    let error = null,
        result;

    try {
        result = await operation();
    } catch (e) {
        error = e;
    }

    return { result, error };
};
