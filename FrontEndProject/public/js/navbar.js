import {checkIfAuthorized} from "./auxiliary.js";
import {setCookie} from "./auxiliary.js";
import {getCookie} from "./auxiliary.js";

async function renderNav(){
    let responseData;
    var isAuthorized
    try {
        isAuthorized = await checkIfAuthorized().then(res=> res.json()).then(data=>responseData=data);
    }
    catch (err){
        isAuthorized=null;
    }
    console.log(isAuthorized)
    if (isAuthorized!=null) {
        console.log(responseData)
        document.querySelectorAll(".optional2").forEach(element => {
            element.style.display="";
        document.querySelector(".mail").innerHTML=responseData.email
        })
    }
    else{
        document.querySelectorAll(".optional").forEach(element => {
            element.style.display="";
        })
    }

}
document.addEventListener("DOMContentLoaded",  () => {
    renderNav()
    document.querySelector(".logout").addEventListener("click",()=>{
        fetch("https://food-delivery.kreosoft.ru/api/account/logout",{
            method: 'POST',
            headers:{
                Authorization:  "Bearer " + getCookie("token")
            }
        }).then(()=> setCookie("token","")).then(window.location.href="http://localhost:3000/")


    })
})