'use strict'

const lUser = window.localStorage?.user
window.addEventListener("DOMContentLoaded", async () => {

	const newUser = document.querySelector("#newChat")
	const userAvatar = document.querySelector("#userAvatar")
	const sendBtn = document.querySelector("#sendBtn")
	const searchText = document.querySelector("#searchText")
	const composeText = document.querySelector("#composeText")
	const logOut = document.querySelector("#logOut")
	const userName = document.querySelector("#userName")
	const deleteAccount = document.querySelector("#deleteAccount")
	// const trash = document.querySelector("#trash")

	// agar user_id localstorageda bo'lmasa login qaytarib yuboradi
	if(!lUser){
		window.location = "/login/"
	}

	// get All users
	let users =await fetch(`${host}/users?user=${lUser}`)

	// If status not equal to 200 return to log in register page
	if(users.status !== 200) return window.location = "/login/"
	users = await users.json()

	userAvatar.src = "/chat/defaultImage.png"
	userName.textContent = capitalize(users.username)

	// Get user activities
	let userActivities =await fetch(`${host}/userAct?user=${lUser}`)

	// get contacts
	let { userAct } = await userActivities.json()


	// render Active users
	renderAllUsers(userAct,false)

	// onclick new chat render all users
	newUser.addEventListener("click",() => {
		renderAllUsers(users.users,true)
	})
	const messageText = document.querySelector("#messageText")
	messageText.addEventListener("keyup",(e) => {
		if(e.keyCode ===13 && !e.shiftKey){
			sendBtn.click()
		}
	})
	sendBtn.addEventListener('click',async () => {
		const selectedUser = document.querySelector("#selectedUser")
		const messageText = document.querySelector("#messageText")
		const user = selectedUser.dataset.id
		let  message = messageText.value.trim()

		if(!user) return alert("Please select user")
		if(!message) return alert("Please write message")
		
		let send = await fetch(host+"/messages",{
			method: "POST",
			body: JSON.stringify({
				user: lUser,
				message,
				from_id: user
			})
		})
		if(send.status !== 200 ){
			message = await send.json()
			alert(message.message)
		}
		let messages = await fetch(`${host}/messages?from_id=${user}&user=${lUser}`)
		messages = await messages.json()
		renderChats(messages.chats,+user)
		messageText.value = ""
	})
	searchText.addEventListener("keyup",()=> {
		let text = searchText.value.trim().toLowerCase()
		let searchUser = userAct.filter((el) => el.username.toLowerCase().includes(text))
		renderAllUsers(searchUser,false)
	})

	composeText.addEventListener("keyup", () => {
		let text = composeText.value.trim().toLowerCase()
		let searchUser = users.users.filter((el) => el.username.toLowerCase().includes(text))
		renderAllUsers(searchUser,true)
	})
	logOut.addEventListener("click",()=>{
		if(confirm("Do you really want to log out?")){
			window.localStorage.removeItem("user")
			window.location = "/login"
		}
	})

	deleteAccount.addEventListener("click",async () => {
		if (!confirm("Are you sure you want to delete your account?")) return
		let password = prompt("Enter your password to delete your account")
		let result = await fetch(`${host}/users?`,{
			method: 'DELETE',
			body: JSON.stringify({
				user: lUser,
				password: `${password}`
			})
		})
		if(result.status !== 200){
			alert("Incorrect password")
		}
		alert("Account successfully deleted")
		window.location.reload()
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
	if(!data) return

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
		icon.src = "/chat/defaultImage.png";

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
			const sendingArea = document.querySelector("#sendingArea")
			const messageText = document.querySelector("#messageText")

			if(user.username === "Deleted Account"){
				sendingArea.style.display = "none"
			}else{
				sendingArea.style.display = "block"
				messageText.focus()
			}
			const selectedUser = document.querySelector("#selectedUser")
			const selectedImg = document.querySelector("#selectedImg")
			const img = document.createElement("img")
			selectedUser.dataset.id = user.user_id
			selectedUser.textContent = user.username
			selectedImg.innerHTML = ""
			img.src = "/chat/defaultImage.png"
			selectedImg.append(img)
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

