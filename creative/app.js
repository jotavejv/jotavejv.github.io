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
        $('.content-close').classList.remove('active');
        $('.content').classList.remove('active');
        $(`#${page}`).classList.remove('active');
    }

    // render
    const render = function(target, content){
        $(`${target} .grid-container`).innerHTML = content;
    }

    // content
    $('.content-close').addEventListener('click', e => closeContent());

    // components
    const Menu = (function(){
        Array.from($$('.link')).map(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                $('.home').classList.add('is-hidden');
                page = e.target.textContent.toLowerCase();
                $('.content').classList.add('active');
                $('nav').classList.add('is-hidden');
                setTimeout(function () {
                    $('.content-close').classList.add('active');
                    $(`#${page}`).classList.add('active');
                }, 250);
            });
        });
    })();

    const Cards = function(data){
        return `
            ${data.map(card => `
                <div class="card card--labs">
                    <h2 class="card__title">
                        <a href="${card.url}">${card.title}</a>
                    </h2>
                    <p class="card__description">${card.description}</p>
                    <div class="card__tags">
                        ${card.tags.map(tag =>`
                                <div class="tag tag--${tag.replace(' ', '-')}">
                                    <span>${tag}</span>
                                </div>`
                            ).join('')
                        }
                    </div>
                    <div class="card__image">
                    <a href="${card.url}">
                        <img src="${card.image}">
                    </a>
                    </div>
                </div>
            `).join('')}
        `
    }

    const Tabs = (function(){
            Array.from($$('.tabs__item')).map(tab => {
                tab.addEventListener('click', function (e) {
                    $('.tabs__item.active').classList.remove('active');
                    this.classList.add('active');
                    let tabContent = this.textContent.toLowerCase().trim().replace(' ', '-');
                    
                    $('.tabs__content > .active').classList.remove('active');
                    $(`#${tabContent}`).classList.add('active');
                });
            });
    })();

    // labs
    getApi("labs").then(data => {        
        render('#labs', Cards(data));
    });
}