import { $$ } from 'dom';
import { track } from 'track';

const GlobalLink = (function () {
    Array.from($$('.link')).map(link => {
        link.addEventListener('click', function (e) {
            let data = link.dataset.track;
            track("external links", data);
        });
    });
})();

export default GlobalLink;