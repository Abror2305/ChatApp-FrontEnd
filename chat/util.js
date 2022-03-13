const host = "http://192.168.1.3:4000"

function idToUser(users,id){}
function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
}
function createElements(...args){
    return args.map(el => document.createElement(el))
}