import {loginUser} from "./auxiliary.js";
const mailRegexp = new RegExp(`[A-z0-9]+@[A-z0-9]+`)
async function checkFields(data){
    let fields=true;
    if(data[0].value==""){
        document.querySelector(".error-empty-email").style.display=""
        document.querySelector(".email").style.borderColor="red"
        fields=false;
    }
   else if(!mailRegexp.test(data[0].value)){
        document.querySelector(".error-email-format").style.display=""
        document.querySelector(".email").style.borderColor="red"
        fields=false;
    }
    if(data[1].value==""){
        document.querySelector(".error-empty-pass").style.display=""
        document.querySelector(".pass").style.borderColor="red"
        fields=false;
    }

    return fields
}
async function login() {
    var loginJSON;
    let data = document.querySelectorAll(".data-field");
    if(await checkFields(data)) {
        await loginUser(data).then(res => {
            return res.json();
        }).then(json => loginJSON = json)
        if (loginJSON && "token" in loginJSON) {
            document.cookie = `token=${loginJSON.token}`;
            window.location.href = "http://localhost:3000"
        }
        else {
            document.querySelector(".error-login").style.display=""
        }
    }
    console.log(loginJSON)


}

document.addEventListener("DOMContentLoaded", () =>{
    const footer = document.querySelector(".footer")
    fetch("/html/footer.html").then(res=>res.text()).then(data2=>footer.innerHTML=data2)
    document.querySelector(".register-button").addEventListener("click", ()=>{
         login()
    });
    document.querySelectorAll(".data-field").forEach((element)=>{
        element.addEventListener("click",(event)=>{
            event.target.placeholder=""
            event.target.style.borderColor=""
            event.target.parentElement.querySelectorAll(".error").forEach((elem)=>elem.style.display="none")
        })
    })
});