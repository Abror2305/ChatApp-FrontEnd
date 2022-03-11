let sSubmit = document.querySelector("#signUp")
let lSubmit = document.querySelector("#login")
let host = "http://192.168.1.2:4000"
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

lSubmit.addEventListener("click",async (e) => {
  e.preventDefault()
  let username = document.querySelector("#logname").value
  let password = document.querySelector("#logpass").value

  console.log(JSON.stringify({username,password}));
  // if(!isValid(username) || !isValid(password)|| password.length < 6) return alert("Wrong input")

  const user = {
    username: username,
    password: password,
  }
  let data = await fetch("http://localhost:4000/login",{
    method: "POST",
    headers:{
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    mode:"no-cors",
    body: JSON.stringify( user )
  })
  data =await data.json()
  console.log(data)
  // console.log(data)
  // window.location = "/chat/index.html"
})

function isValid(str){
  if(!str || str.length < 3  || str.length>20) return false
  return true
}