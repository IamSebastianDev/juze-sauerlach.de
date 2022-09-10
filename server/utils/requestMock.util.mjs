/** @format */

export const request = (body, params) => ({
    body,
    params,
});

export const response = () => ({
    status(status) {
        console.log(status);
        return this;
    },
    json(payload) {
        console.log({ payload });
    },
});
