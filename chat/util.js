const host = "http://192.168.1.8:4000"

/**
 *
 * @param string{string}
 * @returns {string}
 */
function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
}

/**
 *
 * @param args{string}
 * @returns {*[]}
 */
function createElements(...args){
    return args.map(el => document.createElement(el))
}