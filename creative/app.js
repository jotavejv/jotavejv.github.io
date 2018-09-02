function init() {

    const $$ = document.querySelectorAll.bind(document);
    const $ = document.querySelector.bind(document);
    const API = "https://api.npoint.io/ddccb0fb1986eed44828";
    const getApi = function (data) {
        return fetch(`${API}/${data}`)
        .then(response => response.json())
    };

    let page;

    function closeContent() {
        $('.home').classList.remove('is-hidden');
        $('.content').classList.remove('active');
        $(`#${page}`).classList.remove('active');
    }

    // nav
    Array.from($$('.link')).map(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            $('.home').classList.add('is-hidden');
            page = e.target.textContent.toLowerCase();
            $('.content').classList.add('active');
            $('nav').classList.add('is-hidden');
            setTimeout(function () {
                $(`#${page}`).classList.add('active');
            }, 500);
        });
    });

    // render
    const render = function(target, content){
        $(`${target} .grid-container`).innerHTML = content;
    }

    // content
    $('.content-close').addEventListener('click', e => closeContent());

    // components
    const Card = function(data){
        return `
            ${data.map(card => `
                <div class="card card--labs">
                    <h2 class="card__title">${card.title}</h2>
                    <p class="card__description">${card.description}</p>
                    ${card.tags.map(tag =>`
                            <div class="tag">
                                <span>${tag}</span>
                            </div>`
                        ).join('')
                    }
                    <div class="card__image">
                        <img src="${card.image}">
                    </div>
                </div>
            `).join('')}
        `
    }

    // labs
    getApi("labs").then(data => {        
        render('#labs', Card(data));
    });
}