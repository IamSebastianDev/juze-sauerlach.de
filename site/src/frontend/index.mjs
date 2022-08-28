/** @format */

import '../shared/components/privacy.mjs';
import '../shared/components/footer.mjs';
import '../shared/components/spinner.mjs';

window.addEventListener('submit', (ev) => {
    if (ev.target.closest('form#login')) {
        const spinner = document.querySelector('web-spinner');
        spinner.setAttribute('state', 'true');
    }
});
