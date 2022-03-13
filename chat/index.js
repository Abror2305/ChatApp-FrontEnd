'use strict'

window.addEventListener("DOMContentLoaded",async() => {


	// agar user_id localstorageda bo'lmasa homega qaytarib yuboradi
	const lUser = window.localStorage?.user
	const newUser = document.querySelector("#newChat")

	if(!lUser){
		window.location = "/"
	}
	
	let users =await fetch(`${host}/users?user=${lUser}`,{
		method: "GET"
	})
	if(users.status !== 200) return window.location = "/"
	users = await users.json()

	let userAct =await fetch(`${host}/userAct?user=${lUser}`,{
		method: "GET"
	})

	console.log(userAct.status)
	console.log(await userAct.json())

	newUser.addEventListener("click",() => {
		renderAllUsers(users.users,true)
	})

})

function renderAllUsers(data,all){
	let users;
	if(all){
		users = document.querySelector("#allUsers")
	}
	else{
		users = document.querySelector("#actUsers")
	}
	users.innerHTML = ""


	for (const user of data) {

		user.username = capitalize(user.username)
		let [ body, avatar, avatarIcon, icon, main, row, name, nameMeta, time, pullRight] = createElements('div', 'div', 'div', 'img', 'div', 'div', 'div', 'span', 'div', 'span')
		body.classList.add("row", "sideBar-body")
		body.dataset.id = user.user_id
		avatar.classList.add("col-sm-3", "col-xs-3", "sideBar-avatar")
		avatarIcon.classList.add("avatar-icon")
		main.classList.add("col-sm-9", "col-xs-9", "sideBar-main")
		row.classList.add("row")
		name.classList.add("col-sm-8", "col-xs-8", "sideBar-name")
		nameMeta.classList.add("name-meta");
		time.classList.add("col-sm-4", "col-xs-4", "pull-right", "sideBar-time");
		pullRight.classList.add("time-meta", "pull-right");
		icon.src = "./defaultImage.png";

		nameMeta.textContent = user.username;
		// pullRight.textContent = <>;


		avatarIcon.append(icon)
		avatar.append(avatarIcon)
		name.append(nameMeta)
		time.append(pullRight)
		row.append(name, time)
		main.append(row)
		body.append(avatar, main)
		users.append(body)

		body.addEventListener("click", () => {
			const selectedUser = document.querySelector("#selectedUser")
			const selectedImg = document.querySelector("#selectedImg")
			selectedUser.dataset.id = user.user_id
			selectedUser.textContent = user.username
			selectedImg.src = "./defaultImage.png"
		})
	}

}
