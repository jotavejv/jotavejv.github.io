import { Cards } from 'cards';
import { getApi } from 'api';
import { render } from 'render';
import 'track';
import 'menu';
import 'links';
import 'social';
import 'tabs';

export function init() {
    // labs
    getApi("labs").then(data => {
        render('#labs', Cards(data.sort((a, b) => a.order - b.order)));
    });
    // Projects
    getApi("projects").then(data => {
        render('#projects', Cards(data.sort((a, b) => a.order - b.order)));
    });
}