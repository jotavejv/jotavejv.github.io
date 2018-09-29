import { $$, $ } from 'dom';
import { track } from 'track';

function bindCardsTracking() {
    Array.from($$('.card__link')).map(card => {
        card.addEventListener('click', function (e) {
            let data = card.dataset.track;
            track("card", data);
        });
    });
}

export function render (target, content) {
    $(`${target} .grid-container`).innerHTML = content;
    bindCardsTracking();
};