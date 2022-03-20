"use strict";

let sSubmit = document.querySelector("#signUp");
let lSubmit = document.querySelector("#login");
let host = "http://192.168.1.8:4000";
sSubmit.addEventListener("click",async function () {
    let username = document.querySelector("#signUsername")?.value;
    let age = document.querySelector("#signAge")?.value;
    let password = document.querySelector("#signPasswd")?.value;

    const user = {
        username,
        age,
        password
    }

    let data = await fetch(host + "/register", {
        method: "POST",
        body: JSON.stringify(user),
    });
    data = await data.json();
    console.log(data)
    if (data?.status !== 200) {
        return alert(data.message)
    }
    window.localStorage.setItem("user",data.user)
    window.location = "../"
});

lSubmit.addEventListener("click", async () => {
    let username = document.querySelector("#logname").value;
    let password = document.querySelector("#logpass").value;

    console.log(JSON.stringify({ username, password }));
    if(!isValid(username) || !isValid(password)|| password.length < 6) return alert("Please enter valid username or password")

    const user = {
        username,
        password,
    };

    let data = await fetch(host + "/login?'", {
        method: "POST",
        body: JSON.stringify(user),
    });
    data = await data.json();
    if (data?.status !== 200) {
        return alert(data.message)
    }
    window.localStorage.setItem("user",data.user)
    window.location = "../index.html"
});

function isValid(str) {
    return !(!str || str.length < 3 || str.length > 20);
}
