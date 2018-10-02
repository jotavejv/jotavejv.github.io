import { $ } from 'dom';

let variables = {
    page: ''
}
let currentHash;

function setHash(page){
    window.location.hash = `#${page}`;
}

function closeContent(flag) {
    $('.home').classList.remove('is-hidden');
    $('.content-close').classList.remove('active');
    $('.content').classList.remove('active');
    $(`#${variables.page}`).classList.remove('active');
    document.documentElement.focus(); // prevent mobile menu active
    if(flag) setHash("home");
}
$('.content-close').addEventListener('click', e => closeContent(true));

// handle hashs (for mobile experience)
window.onpopstate = function (e) {
    currentHash = window.location.hash;
    if (currentHash == "#home"){
        closeContent(true);
        return;
    }
    if (currentHash) {
        $(`[data-page="${currentHash}"]`).click();
    }else{
        closeContent(false);
    }
};


export { variables, setHash };