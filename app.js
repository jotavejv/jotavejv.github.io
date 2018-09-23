function init() {

    const $$ = document.querySelectorAll.bind(document);
    const $ = document.querySelector.bind(document);
    const API = "https://api.npoint.io/ddccb0fb1986eed44828";
    const getApi = function (data) {
        return fetch(`${API}/${data}`)
        .then(response => response.json())
    };
    let page;

    function pageview(view){
        ga('send', 'pageview', `/${view}`);
    }

    function track(categorie, element){
        ga('send', 'event', `${categorie}`, 'click', `${element}`);
    }

    function bindCardsTracking(){
        Array.from($$('.card__link')).map(card => {
            card.addEventListener('click', function (e) {
                let data = card.dataset.track;
                track("card", data);
            });
        });
    }

    function closeContent() {
        $('.home').classList.remove('is-hidden');
        $('.content-close').classList.remove('active');
        $('.content').classList.remove('active');
        $(`#${page}`).classList.remove('active');
    }

    // render
    const render = function(target, content){
        $(`${target} .grid-container`).innerHTML = content;
        bindCardsTracking();
    }

    // content
    $('.content-close').addEventListener('click', e => closeContent());

    // components
    const Menu = (function(){
        Array.from($$('nav li')).map(link => {
            link.addEventListener('click', function (e) {
                if(link.id == "contact") {
                    send(contact);
                    return;
                };
                e.preventDefault();
                $('.home').classList.add('is-hidden');
                page = e.target.textContent.toLowerCase();
                $('.content').classList.add('active');
                $('nav').classList.add('is-hidden');
                setTimeout(function () {
                    $('.content-close').classList.add('active');
                    $(`#${page}`).classList.add('active');
                    pageview(page);
                }, 300);
            });
        });
    })();

    const SocialLink = (function(){
        Array.from($$('.social li')).map(social => {
            social.addEventListener('click', function (e) {
                let data = social.dataset.track;
                track("social", data);
            });
        });
    })();

    const GlobalLink = (function(){
        Array.from($$('.link')).map(link => {
            link.addEventListener('click', function (e) {
                let data = link.dataset.track;
                track("external links", data);
            });
        });
    })();

    const Cards = function(data){
        return `
            ${data.map(card => `
                <div class="card">
                    <a href="${card.url}" target="_blank" class="card__link" data-track="${card.title}">
                        <h2 class="card__title">
                            ${card.title}
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
                            <img src="${card.image}">
                        </div>
                    </a>
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
                    track("tab content", tabContent);
                });
            });
    })();

    // labs
    getApi("labs").then(data => {  
        render('#labs', Cards(data.sort((a, b) => a.order - b.order)));
    });
    // Projects
    getApi("projects").then(data => {        
        render('#projects', Cards(data.sort((a, b) => a.order - b.order)));
    });
}