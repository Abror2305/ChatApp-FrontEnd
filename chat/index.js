'use strict'

const lUser = window.localStorage?.user
window.addEventListener("DOMContentLoaded", async (data, all) => {

	const newUser = document.querySelector("#newChat")
	const userAvatar = document.querySelector("#userAvatar")

	// agar user_id localstorageda bo'lmasa homega qaytarib yuboradi
	if(!lUser){
		window.location = "/"
	}

	// get All users
	let users =await fetch(`${host}/users?user=${lUser}`,{
		method: "GET"
	})

	// If status not equal to 200 return to log in register page
	if(users.status !== 200) return window.location = "/"
	users = await users.json()

	userAvatar.src = "./defaultImage.png"

	// Get user activities
	let userActivities =await fetch(`${host}/userAct?user=${lUser}`,{
		method: "GET"
	})

	// get contacts
	let { userAct } = await userActivities.json()
	console.log(userAct)

	// function id to user, /userAct response only ids
	let userContacts = idToUser(userAct?.contact,users.users)

	// render Active users
	renderAllUsers(userContacts, all)

	// onclick new chat render all users
	newUser.addEventListener("click",() => {
		renderAllUsers(users.users,true)
	})

})

/**
 *
 * @param data{Array}
 * @param all{boolean}
 */
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

		body.addEventListener("click", async () => {
			const selectedUser = document.querySelector("#selectedUser")
			const selectedImg = document.querySelector("#selectedImg")
			selectedUser.dataset.id = user.user_id
			selectedUser.textContent = user.username
			selectedImg.src = "./defaultImage.png"
			let messages = await fetch(`${host}/messages?from_id=${user.user_id}&user=${lUser}`)
			messages = await messages.json()
			renderChats(messages.chats,user.user_id)
		})
	}

}
function renderChats(data,reciverId){
	const conversation = document.querySelector("#conversation")
	conversation.innerHTML = ""
	for (let chat of data) {
		let [body,column,option,messgeText,time] = createElements("div","div","div","div","span")
		let reciver = chat.from_id === reciverId
		body.classList.add("row","message-body")
		column.classList.add("col-sm-12",reciver ? "message-main-sender" : "message-main-receiver")
		option.classList.add(reciver ? "sender" : "receiver")
		messgeText.classList.add("message-text")
		time.classList.add("message-time", "pull-right")
		messgeText.innerText = chat.message

		time.textContent = new Date(chat.date).toLocaleTimeString("it-IT")

		option.append(messgeText,time)
		column.append(option)
		body.append(column)
		conversation.append(body)
	}
}