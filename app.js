!function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=2)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=document.querySelectorAll.bind(document),a=document.querySelector.bind(document);t.$$=r,t.$=a},function(e,t,n){"use strict";function r(e){ga("send","pageview","/"+e)}function a(e,t){ga("send","event",""+e,"click",""+t)}Object.defineProperty(t,"__esModule",{value:!0}),function(e,t,n,r,a,i,o){e.GoogleAnalyticsObject=a,e[a]=e[a]||function(){(e[a].q=e[a].q||[]).push(arguments)},e[a].l=1*new Date,i=t.createElement(n),o=t.getElementsByTagName(n)[0],i.async=1,i.src="https://www.google-analytics.com/analytics.js",o.parentNode.insertBefore(i,o)}(window,document,"script",0,"ga"),ga("create","UA-43403124-1","auto"),ga("send","pageview"),t.pageview=r,t.track=a},function(e,t,n){"use strict";var r=n(3);document.addEventListener("DOMContentLoaded",r.init)},function(e,t,n){"use strict";function r(){i.default.styles.default="font-size: 20px;",i.default.show("Gotcha! 😅🔍💻")(),(0,o.getApi)("labs").then(function(e){(0,c.render)("#labs",(0,s.Cards)(e.sort(function(e,t){return e.order-t.order})))}),(0,o.getApi)("projects").then(function(e){(0,c.render)("#projects",(0,s.Cards)(e.sort(function(e,t){return e.order-t.order})))})}Object.defineProperty(t,"__esModule",{value:!0}),t.init=r;var a=n(4),i=function(e){return e&&e.__esModule?e:{default:e}}(a),o=n(5),c=n(6),s=n(7);n(1),n(8),n(10),n(11),n(12)},function(e,t,n){"use strict";function r(e,t){var n=[console],r=!0,a=!1,o=void 0;try{for(var c,s=t[Symbol.iterator]();!(r=(c=s.next()).done);r=!0){var u=c.value;"string"==typeof u&&1===n.length?n.push("%c "+u,e):n.push(u)}}catch(e){a=!0,o=e}finally{try{!r&&s.return&&s.return()}finally{if(a)throw o}}return i.bind.apply(i,n)}var a={default:"color: gray; font-weight: bold;",info:"color: blue; font-weight: bold;",warn:"color: #ffc107;",danger:"color: lightcoral; font-weight: bold;"},i=console.log,o={styles:a,show:function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return r(a.default,t)},info:function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return r(a.info,t)},warn:function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return r(a.warn,t)},danger:function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return r(a.danger,t)}};e.exports=o},function(e,t,n){"use strict";function r(e){return fetch(a+"/"+e).then(function(e){return e.json()})}Object.defineProperty(t,"__esModule",{value:!0}),t.getApi=r;var a="https://api.npoint.io/ddccb0fb1986eed44828"},function(e,t,n){"use strict";function r(){Array.from((0,i.$$)(".card__link")).map(function(e){e.addEventListener("click",function(t){var n=e.dataset.track;(0,o.track)("card",n)})})}function a(e,t){(0,i.$)(e+" .grid-container").innerHTML=t,r()}Object.defineProperty(t,"__esModule",{value:!0}),t.render=a;var i=n(0),o=n(1)},function(e,t,n){"use strict";function r(e){return"\n            "+e.map(function(e){return'\n                <div class="card">\n                    <a href="'+e.url+'" target="_blank" class="card__link" data-track="'+e.title+'">\n                        <h2 class="card__title">\n                            '+e.title+'\n                        </h2>\n                        <p class="card__description">'+e.description+'</p>\n                        <div class="card__tags">\n                            '+e.tags.map(function(e){return'\n                                    <div class="tag tag--'+e.replace(" ","-")+'">\n                                        <span>'+e+"</span>\n                                    </div>"}).join("")+'\n                        </div>\n                        <div class="card__image">\n                            <img src="'+e.image+'">\n                        </div>\n                    </a>\n                </div>\n            '}).join("")+"\n        "}Object.defineProperty(t,"__esModule",{value:!0}),t.Cards=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(9),i=n(1),o=function(){Array.from((0,r.$$)("nav li")).map(function(e){e.addEventListener("click",function(t){if("contact"==e.id)return void(0,i.track)("contact","contact menu");t.preventDefault(),(0,r.$)(".home").classList.add("is-hidden"),a.variables.page=t.target.textContent.toLowerCase(),(0,a.setHash)(a.variables.page),(0,r.$)(".content").classList.add("active"),(0,r.$)("nav").classList.add("is-hidden"),setTimeout(function(){(0,r.$)(".content-close").classList.add("active"),(0,r.$)("#"+a.variables.page).classList.add("active"),(0,i.pageview)(a.variables.page)},300)})})}();t.default=o},function(e,t,n){"use strict";function r(e){window.location.hash="#"+e}function a(){(0,i.$)(".home").classList.remove("is-hidden"),(0,i.$)(".content-close").classList.remove("active"),(0,i.$)(".content").classList.remove("active"),(0,i.$)("#"+o.page).classList.remove("active"),r("home")}Object.defineProperty(t,"__esModule",{value:!0}),t.setHash=t.variables=void 0;var i=n(0),o={page:""};window.location.hash;(0,i.$)(".content-close").addEventListener("click",function(e){return a()}),window.onpopstate=function(e){"#home"==window.location.hash&&a()},t.variables=o,t.setHash=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(1),i=function(){Array.from((0,r.$$)(".link")).map(function(e){e.addEventListener("click",function(t){var n=e.dataset.track;(0,a.track)("external links",n)})})}();t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(1),i=function(){Array.from((0,r.$$)(".social li")).map(function(e){e.addEventListener("click",function(t){var n=e.dataset.track;(0,a.track)("social",n)})})}();t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(1),i=function(){Array.from((0,r.$$)(".tabs__item")).map(function(e){e.addEventListener("click",function(e){(0,r.$)(".tabs__item.active").classList.remove("active"),this.classList.add("active");var t=this.textContent.toLowerCase().trim().replace(" ","-");(0,r.$)(".tabs__content > .active").classList.remove("active"),(0,r.$)("#"+t).classList.add("active"),(0,a.track)("tab content",t)})})}();t.default=i}]);