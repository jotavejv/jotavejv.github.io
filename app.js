!function(e){function t(a){if(n[a])return n[a].exports;var r=n[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,a){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=2)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=document.querySelectorAll.bind(document),r=document.querySelector.bind(document);t.$$=a,t.$=r},function(e,t,n){"use strict";function a(e){ga("send","pageview","/"+e)}function r(e,t){ga("send","event",""+e,"click",""+t)}Object.defineProperty(t,"__esModule",{value:!0}),function(e,t,n,a,r,c,i){e.GoogleAnalyticsObject=r,e[r]=e[r]||function(){(e[r].q=e[r].q||[]).push(arguments)},e[r].l=1*new Date,c=t.createElement(n),i=t.getElementsByTagName(n)[0],c.async=1,c.src="https://www.google-analytics.com/analytics.js",i.parentNode.insertBefore(c,i)}(window,document,"script",0,"ga"),ga("create","UA-43403124-1","auto"),ga("send","pageview"),t.pageview=a,t.track=r},function(e,t,n){"use strict";var a=n(3);document.addEventListener("DOMContentLoaded",a.init)},function(e,t,n){"use strict";function a(){(0,c.getApi)("labs").then(function(e){(0,i.render)("#labs",(0,r.Cards)(e.sort(function(e,t){return e.order-t.order})))}),(0,c.getApi)("projects").then(function(e){(0,i.render)("#projects",(0,r.Cards)(e.sort(function(e,t){return e.order-t.order})))})}Object.defineProperty(t,"__esModule",{value:!0}),t.init=a;var r=n(4),c=n(5),i=n(6);n(1),n(7),n(9),n(10),n(11)},function(e,t,n){"use strict";function a(e){return"\n            "+e.map(function(e){return'\n                <div class="card">\n                    <a href="'+e.url+'" target="_blank" class="card__link" data-track="'+e.title+'">\n                        <h2 class="card__title">\n                            '+e.title+'\n                        </h2>\n                        <p class="card__description">'+e.description+'</p>\n                        <div class="card__tags">\n                            '+e.tags.map(function(e){return'\n                                    <div class="tag tag--'+e.replace(" ","-")+'">\n                                        <span>'+e+"</span>\n                                    </div>"}).join("")+'\n                        </div>\n                        <div class="card__image">\n                            <img src="'+e.image+'">\n                        </div>\n                    </a>\n                </div>\n            '}).join("")+"\n        "}Object.defineProperty(t,"__esModule",{value:!0}),t.Cards=a},function(e,t,n){"use strict";function a(e){return fetch(r+"/"+e).then(function(e){return e.json()})}Object.defineProperty(t,"__esModule",{value:!0}),t.getApi=a;var r="https://api.npoint.io/ddccb0fb1986eed44828"},function(e,t,n){"use strict";function a(){Array.from((0,c.$$)(".card__link")).map(function(e){e.addEventListener("click",function(t){var n=e.dataset.track;(0,i.track)("card",n)})})}function r(e,t){(0,c.$)(e+" .grid-container").innerHTML=t,a()}Object.defineProperty(t,"__esModule",{value:!0}),t.render=r;var c=n(0),i=n(1)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),r=n(8),c=n(1);console.log(r.variables.page);var i=function(){Array.from((0,a.$$)("nav li")).map(function(e){e.addEventListener("click",function(t){if("contact"==e.id)return void(0,c.track)("contact","contact menu");t.preventDefault(),(0,a.$)(".home").classList.add("is-hidden"),r.variables.page=t.target.textContent.toLowerCase(),(0,a.$)(".content").classList.add("active"),(0,a.$)("nav").classList.add("is-hidden"),setTimeout(function(){(0,a.$)(".content-close").classList.add("active"),(0,a.$)("#"+r.variables.page).classList.add("active"),(0,c.pageview)(r.variables.page)},300)})})}();t.default=i},function(e,t,n){"use strict";function a(){(0,r.$)(".home").classList.remove("is-hidden"),(0,r.$)(".content-close").classList.remove("active"),(0,r.$)(".content").classList.remove("active"),(0,r.$)("#"+c.page).classList.remove("active")}Object.defineProperty(t,"__esModule",{value:!0}),t.variables=void 0;var r=n(0),c={page:""};(0,r.$)(".content-close").addEventListener("click",function(e){return a()}),t.variables=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),r=n(1),c=function(){Array.from((0,a.$$)(".link")).map(function(e){e.addEventListener("click",function(t){var n=e.dataset.track;(0,r.track)("external links",n)})})}();t.default=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),r=n(1),c=function(){Array.from((0,a.$$)(".social li")).map(function(e){e.addEventListener("click",function(t){var n=e.dataset.track;(0,r.track)("social",n)})})}();t.default=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),r=n(1),c=function(){Array.from((0,a.$$)(".tabs__item")).map(function(e){e.addEventListener("click",function(e){(0,a.$)(".tabs__item.active").classList.remove("active"),this.classList.add("active");var t=this.textContent.toLowerCase().trim().replace(" ","-");(0,a.$)(".tabs__content > .active").classList.remove("active"),(0,a.$)("#"+t).classList.add("active"),(0,r.track)("tab content",t)})})}();t.default=c}]);