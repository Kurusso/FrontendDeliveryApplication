import {fetchBasket} from "./auxiliary.js";
import  {checkIfAuthorized} from "./auxiliary.js";
import {acceptOrder} from "./auxiliary.js";
async function checkFields(date, address){
    let fields=true;
    let dateInFormat=new Date()
    dateInFormat.setTime(dateInFormat.getTime() + (60*60*1000))
    if(date==""){
        document.querySelector(".error-empty-time").style.display=""
        document.querySelector(".data-field-time").style.borderColor="red"
        fields=false;
    }
    else if(dateInFormat>= new Date(date)){
        document.querySelector(".error-wrong-time").style.display=""
        document.querySelector(".data-field-time").style.borderColor="red"
        fields=false;
    }
    if(address==""){
        document.querySelector(".error-empty-address").style.display=""
        document.querySelector(".data-field-address").style.borderColor="red"
        fields=false;
    }

    return fields
}
async function renderPurchase(){
    var responseData;
        await fetchBasket().then(res=> {
            if(res.status==200) return res.json()
        }).then(data=>responseData=data);
        if(responseData==undefined || responseData.length==0){
            window.location.href="http://localhost:3000/error"
        }
    let orderCost=0;
    let clone=[]
    let i=0;
    document.querySelectorAll(".cart-dish-box").forEach(element=>{
        if(element.style.display=="")
            element.remove();
    })
    responseData.forEach(element=>{
        clone.push(document.querySelector(".cart-dish-box").cloneNode(true))
        clone[i].style.display="";
        clone[i].querySelector(".dish-name").innerHTML=element.name;
        clone[i].querySelector(".dish-cost").innerHTML+=element.price
        clone[i].querySelector(".dish-order-amount").innerHTML+=element.amount
        clone[i].querySelector(".full-dish-price").innerHTML=(element.amount*element.price)
        clone[i].querySelector(".image-size").src=element.image
        document.querySelector(".dish-list").appendChild(clone[i]);
        orderCost+=element.amount*element.price
        i++;
    })
    var profileJSON;
    await checkIfAuthorized().then(res=> res.json()).then(data=>profileJSON=data);
    document.querySelector(".data-field-address").value=profileJSON.address
    document.querySelector(".full-order-price").innerHTML=orderCost;
}


document.addEventListener("DOMContentLoaded",()=>{
    const footer = document.querySelector(".footer")
    fetch("/html/footer.html").then(res=>res.text()).then(data2=>footer.innerHTML=data2)
    renderPurchase();
    document.querySelector(".accept-button").addEventListener("click",async ()=>{
        const address=document.querySelector(".data-field-address").value
        let date=document.querySelector(".data-field-time").value;
        let dateInFormat=new Date()
        dateInFormat.setTime(dateInFormat.getTime() + (60*60*1000))

       if(await checkFields(date,address)){
           await acceptOrder(address,date).then(()=>window.location.href="http://localhost:3000/orders")
       }
    })
    document.querySelectorAll(".data-field").forEach((element)=>{
        element.addEventListener("click",(event)=>{
            event.target.placeholder=""
            event.target.style.borderColor=""
            event.target.parentElement.querySelectorAll(".error").forEach(elem=>elem.style.display="none")
        })
    })
    })