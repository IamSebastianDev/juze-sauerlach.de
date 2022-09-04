/** @format */

export const injector =
    (...injectionFunctions) =>
    (content, route, query) => {
        injectionFunctions.forEach((callback) => callback(content, route, query));
    };
