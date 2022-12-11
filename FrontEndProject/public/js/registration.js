import {registerUser} from "./auxiliary.js";
const mailRegexp = new RegExp(`[A-z0-9]+@[A-z0-9]+`)
const passRegexp = new RegExp(`[0-9]+`)
async function checkFields(data){
    let fields=true;
    if(data[0].value==""){
        document.querySelector(".error-empty-name").style.display=""
        document.querySelector(".name").style.borderColor="red"
        fields=false;
    }
    if(data[6].value==""){
        document.querySelector(".error-empty-pass-2").style.display=""
        document.querySelector(".pass").style.borderColor="red"
        fields=false;
        }
    else  if(data[6].value.length>0 && data[6].value.length<6){
        document.querySelector(".error-empty-pass-1").style.display=""
        document.querySelector(".pass").style.borderColor="red"
        fields=false;
        }
   else if(!passRegexp.test(data[6].value)){
        document.querySelector(".error-digit").style.display=""
        document.querySelector(".pass").style.borderColor="red"
        fields=false;
        }
    if(data[5].value==""){
        document.querySelector(".error-empty-email").style.display=""
        document.querySelector(".email").style.borderColor="red"
        fields=false;
        }
    else if(!mailRegexp.test(data[5].value)){
        document.querySelector(".error-email-format").style.display=""
        document.querySelector(".email").style.borderColor="red"
        fields=false;
    }

    if(data[4].value==""){
        document.querySelector(".error-empty-date").style.display=""
        document.querySelector(".date").style.borderColor="red"
        fields=false;
        }

    if(data[2].value.length<11 ){

        document.querySelector(".error-empty-number").style.display=""
        document.querySelector(".phone").style.borderColor="red"
        fields=false;
        }
    if(new Date(data[4].value)>=new Date()){
        document.querySelector(".date").style.borderColor="red"
        document.querySelector(".error-date").style.display=""
        fields=false;
        }


    return fields
}
async function register() {
    let data = document.querySelectorAll(".data-field");
    var registerJSON;
    if(await checkFields(data)) {
        await registerUser(data).then(res => {
            return res.json();
        }).then(json => registerJSON = json)
        console.log(registerJSON)
        if(registerJSON && "DuplicateUserName" in registerJSON){
            document.querySelector(".email").style.borderColor="red"
            document.querySelector(".error-duplicate").style.display=""
        }
    }

}

document.addEventListener("DOMContentLoaded", () =>{
    const footer = document.querySelector(".footer")
    fetch("/html/footer.html").then(res=>res.text()).then(data2=>footer.innerHTML=data2)
   document.querySelector(".register-button").addEventListener("click", ()=>{
       register();
   });
    document.querySelectorAll(".data-field").forEach((element)=>{
        element.addEventListener("click",(event)=>{
            event.target.placeholder=""
            event.target.style.borderColor=""
            event.target.parentElement.querySelectorAll(".error").forEach(elem=>elem.style.display="none")
        })
    })
});