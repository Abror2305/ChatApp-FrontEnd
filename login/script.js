let sSubmit = document.querySelector("#signUp")
let lSubmit = document.querySelector("#login")

sSubmit.addEventListener("click", function(e){

  let username = document.querySelector("#signUsername")?.value
  let age = document.querySelector("#signAge")?.value
  let passwd = document.querySelector("#signPasswd")?.value
  e.preventDefault()

  console.log(username,age, passwd);

  if(
    !isValid(username) || 
    !isValid(passwd) || 
    isNaN(+age) || 
    age < 12 || age > 90 ||
    passwd.length < 6){
      return alert("WRONG INPUT")
    }

    console.log("hello")
    
    window.localStorage.user_id = 1
    window.location = "/chat/index.html"
})

lSubmit.addEventListener("click",(e) => {
  e.preventDefault()
  let username = document.querySelector("#logname").value
  let password = document.querySelector("#logpass").value

  if(!isValid(username) || !isValid(password)|| password.length < 6) return alert("Wrong input")

  window.localStorage.user_id = 1
  window.location = "/chat/index.html"
})

function isValid(str){
  if(!str || str.length < 3  || str.length>20) return false
  return true
}