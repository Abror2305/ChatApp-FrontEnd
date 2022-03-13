const host = "http://192.168.1.8:4000"


function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
}
function createElements(...args){
    return args.map(el => document.createElement(el))
}