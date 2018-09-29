import { $$ } from 'dom';
import { track } from 'track';

const SocialLink = (function () {
    Array.from($$('.social li')).map(social => {
        social.addEventListener('click', function (e) {
            let data = social.dataset.track;
            track("social", data);
        });
    });
})();

export default SocialLink;