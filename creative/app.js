function init() {

    const API = "https://api.npoint.io/ddccb0fb1986eed44828";
    const getApi = function (data) {
        return fetch(`${API}/${data}`)
        .then(response => response.json())
    };

    let page;
    let $$ = document.querySelectorAll.bind(document);
    let $ = document.querySelector.bind(document);

    function closeContent() {
        $('.content').classList.remove('active');
        $('nav').classList.remove('is-hidden');
        $(`#${page}`).classList.remove('active', 'block');
    }
    Array.from($$('.link')).map(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            page = e.target.textContent.toLowerCase();
            $('.content').classList.add('active');
            $('nav').classList.add('is-hidden');
            $(`#${page}`).classList.add('block');
            setTimeout(function () {
                $(`#${page}`).classList.add('active');
            }, 500);
        });
    });
    $('.content-close').addEventListener('click', e => closeContent());

    getApi("labs").then(data => console.log(data[0]));
}