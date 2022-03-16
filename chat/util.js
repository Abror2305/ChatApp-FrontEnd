const host = "http://localhost:4000"

/**
 *
 * @param ids{[]}
 * @param users{[]}
 * @returns {[]}
 */
function idToUser(ids,users){
    return users.filter(el => ids?.includes(el.user_id))
}

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