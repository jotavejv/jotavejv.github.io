import { $$, $ } from 'dom';
import { variables } from 'global';
import { pageview, track } from 'track';

const Menu = (function () {
    Array.from($$('nav li')).map(link => {
        link.addEventListener('click', function (e) {
            if (link.id == "contact") {
                track("contact", "contact menu");
                return;
            };
            e.preventDefault();
            $('.home').classList.add('is-hidden');
            variables.page = e.target.textContent.toLowerCase();
            $('.content').classList.add('active');
            $('nav').classList.add('is-hidden');
            setTimeout(function () {
                $('.content-close').classList.add('active');
                $(`#${variables.page}`).classList.add('active');
                pageview(variables.page);
            }, 300);
        });
    });
})();

export default Menu;