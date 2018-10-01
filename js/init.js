import log from "stylish-log";
import { getApi } from 'api';
import { render } from 'render';
import { Cards } from 'cards';
import 'track';
import 'menu';
import 'links';
import 'social';
import 'tabs';

export function init() {
    log.styles.default = 'font-size: 20px;';
    log.show("Gotcha! 😅🔍💻")();
    
    // Labs
    getApi("labs").then(data => {
        render('#labs', Cards(data.sort((a, b) => a.order - b.order)));
    });
    // Projects
    getApi("projects").then(data => {
        render('#projects', Cards(data.sort((a, b) => a.order - b.order)));
    });
}
