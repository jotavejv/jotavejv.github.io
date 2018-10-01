'use strict';

const styles = {
    default: 'color: gray; font-weight: bold;',
    info: 'color: blue; font-weight: bold;',
    warn: 'color: #ffc107;',
    danger: 'color: lightcoral; font-weight: bold;'
}

const logg = console.log;

function print(style, texts) {
    let bindArgs = [console];
    for (let text of texts) {
        if (typeof text === "string" && bindArgs.length === 1) {
            bindArgs.push('%c ' + text, style);
        } else {
            bindArgs.push(text);
        }
    }
    return logg.bind(...bindArgs);
}

let log = {
    styles,
    show (...texts) {
    return print(styles.default, texts);
},
info (...texts) {
    return print(styles.info, texts);
},
warn (...texts) {
    return print(styles.warn, texts);
},
danger (...texts) {
    return print(styles.danger, texts);
}
};

module.exports = log;

