"use strict";

let sSubmit = document.querySelector("#signUp");
let lSubmit = document.querySelector("#login");
let host = "http://192.168.1.3:4000";
sSubmit.addEventListener("click",async function (e) {
    let username = document.querySelector("#signUsername")?.value;
    let age = document.querySelector("#signAge")?.value;
    let password = document.querySelector("#signPasswd")?.value;

    console.log(username, age, password);

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
    window.localStorage.setItem("user_id",data.user_id)
    window.location = "/chat/index.html"
});

lSubmit.addEventListener("click", async (e) => {
    let username = document.querySelector("#logname").value;
    let password = document.querySelector("#logpass").value;

    console.log(JSON.stringify({ username, password }));
    if(!isValid(username) || !isValid(password)|| password.length < 6) return alert("Please enter valid username or password")

    const user = {
        username,
        password,
    };

    let data = await fetch(host + "/login", {
        method: "POST",
        body: JSON.stringify(user),
    });
    data = await data.json();
    if (data?.status !== 200) {
        return alert(data.message)
    }
    window.localStorage.setItem("user_id",data.user_id)
    window.location = "/chat/index.html"
});

function isValid(str) {
    if (!str || str.length < 3 || str.length > 20) return false;
    return true;
}
