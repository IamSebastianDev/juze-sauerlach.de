/** @format */

class MessageService {
    constructor(selector) {
        this.outlet = document.querySelector(selector);
    }

    dispatch({ text, type }) {
        const message = document.createElement('j-flash-message');
        message.setAttribute('text', text);
        message.setAttribute('type', type);

        this.outlet.append(message);
    }
}

export const messageService = new MessageService('#flash-message-outlet');
