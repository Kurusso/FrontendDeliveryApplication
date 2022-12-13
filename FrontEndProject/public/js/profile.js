import {checkIfAuthorized} from "./auxiliary.js";
import {changeProfile} from "./auxiliary.js";
async function checkFields(data){
    let fields=true;
    if(data[0].value==""){
        document.querySelector(".error-empty-name").style.display=""
        document.querySelector(".name").style.borderColor="red"
        fields=false;
    }

    if(data[2].value==""){
        document.querySelector(".error-empty-date").style.display=""
        document.querySelector(".date").style.borderColor="red"
        fields=false;
    }
    if(data[5].value.length<11 ){
        document.querySelector(".error-empty-number").style.display=""
        document.querySelector(".phone").style.borderColor="red"
        fields=false;
    }
    if(new Date(data[2].value)>=new Date()){
        document.querySelector(".date").style.borderColor="red"
        document.querySelector(".error-date").style.display=""
        fields=false;
    }

    return fields
}
async function renderProfile(){
    var profileJSON;
    await checkIfAuthorized().then(res=> {
        if(res.status==200) return res.json()
    }).then(json=>profileJSON=json);
    if(profileJSON==undefined){
        window.location.href="http://localhost:3000/error"
    }
    document.querySelector(".name").value=profileJSON.fullName
    document.querySelector(".email").innerHTML=profileJSON.email
    document.querySelector(".date").value=profileJSON.birthDate.slice(0,10)
    document.querySelector(".gender").innerHTML=profileJSON.gender
    document.querySelector(".address").value=profileJSON.address
    document.querySelector(".number").value=profileJSON.phoneNumber
    document.querySelector(".register-button").addEventListener("click",async () => {
        let data = document.querySelectorAll(".data");
        if(await checkFields(data)){
        var json = JSON.stringify(
            {
                "fullName": data[0].value,
                "birthDate": data[2].value + "T00:00:00Z",
                "gender": data[3].innerHTML,
                "address": data[4].value,
                "phoneNumber": data[5].value
            }
        )
        await changeProfile(json)
        document.querySelector(".update").style.display=""
    }
        else {
            document.querySelector(".update").style.display="none"
        }
    })
}
document.addEventListener("DOMContentLoaded", () => {
    const footer = document.querySelector(".footer")
    fetch("/html/footer.html").then(res => res.text()).then(data2 => footer.innerHTML = data2)
    renderProfile()
    document.querySelectorAll(".data-field").forEach((element)=>{
        element.addEventListener("click",(event)=>{
            event.target.placeholder=""
            event.target.style.borderColor=""
            event.target.parentElement.querySelectorAll(".error").forEach(elem=>elem.style.display="none")
        })
    })
});