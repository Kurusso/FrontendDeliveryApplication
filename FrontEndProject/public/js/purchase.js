import {fetchBasket} from "./auxiliary.js";
import  {checkIfAuthorized} from "./auxiliary.js";
import {acceptOrder} from "./auxiliary.js";

async function renderPurchase(){
    var responseData;
    try {
        await fetchBasket().then(res=> res.json()).then(data=>responseData=data);
        console.log(responseData)
    }
    catch (err){
        console.log(err)
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
    document.querySelector(".accept-button").addEventListener("click",()=>{
        const address=document.querySelector(".data-field-address").value
        let date=document.querySelector(".data-field-time").value;
        acceptOrder(address,date)
        window.location.href="http://localhost:3000/orders"
    })
    })