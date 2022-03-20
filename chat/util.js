const host = "https://chatappnodejs23.herokuapp.com"

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