import { $$, $} from 'dom';
import { track } from 'track';

const Tabs = (function () {
    Array.from($$('.tabs__item')).map(tab => {
        tab.addEventListener('click', function (e) {
            $('.tabs__item.active').classList.remove('active');
            this.classList.add('active');
            let tabContent = this.textContent.toLowerCase().trim().replace(' ', '-');
            $('.tabs__content > .active').classList.remove('active');
            $(`#${tabContent}`).classList.add('active');
            track("tab content", tabContent);
        });
    });
})();

export default Tabs;