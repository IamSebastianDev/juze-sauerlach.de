/** @format */

export class Validate {
    static createStrategy(strategy, message) {
        return (value) => {
            const validated = strategy(value);
            return {
                validated,
                message: !validated ? message : '',
            };
        };
    }

    static NotNull(value) {
        return value !== null;
    }

    static StringNotEmpty(string) {
        return string.trim() !== '' && string.trim().length !== 0;
    }

    static StringHasLength(length) {
        return (string) => {
            return string.trim() && string.trim().length > length;
        };
    }

    static IsOfType(type) {
        return (value) => typeof value === type;
    }
}
