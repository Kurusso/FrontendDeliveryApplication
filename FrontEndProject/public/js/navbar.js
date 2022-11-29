import {checkIfAuthorized} from "./auxiliary.js";
import {setCookie} from "./auxiliary.js";

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
        setCookie("token","")
        window.location.href="http://localhost:3000/"
    })
})