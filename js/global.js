import { $ } from 'dom';

let variables = {
    page: ''
}
const flagInitialLoad = window.location.hash;

function setHash(page){
    window.location.hash = `#${page}`;
}

function closeContent() {
    $('.home').classList.remove('is-hidden');
    $('.content-close').classList.remove('active');
    $('.content').classList.remove('active');
    $(`#${variables.page}`).classList.remove('active');
    setHash("home");
}
$('.content-close').addEventListener('click', e => closeContent());

// handle hashs (for mobile experience)
window.onpopstate = function (e) {
    let currentHash = window.location.hash;
    if (currentHash == "#home"){
        closeContent();
    }
};


export { variables, setHash };