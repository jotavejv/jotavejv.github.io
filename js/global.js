import { $ } from 'dom';

let variables = {
    page: ''
}

function closeContent() {
    $('.home').classList.remove('is-hidden');
    $('.content-close').classList.remove('active');
    $('.content').classList.remove('active');
    $(`#${variables.page}`).classList.remove('active');
}
$('.content-close').addEventListener('click', e => closeContent());

export { variables };