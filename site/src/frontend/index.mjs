/** @format */

import '../shared/components/privacy/privacy.mjs';
import '../shared/components/footer/footer.mjs';
import '../shared/components/spinner/spinner.mjs';

window.addEventListener('submit', (ev) => {
    if (ev.target.closest('form#login')) {
        const spinner = document.querySelector('web-spinner');
        spinner.setAttribute('state', 'true');
    }
});
