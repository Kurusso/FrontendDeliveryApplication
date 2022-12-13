import {acceptDelivery, fetchBasket} from "./auxiliary.js";
import {fetchOrders} from "./auxiliary.js";

async function renderOrders(){
    let jsonData;
    await fetchBasket().then(res=> {
        if(res.status==200) return res.json()
    }).then(data=>jsonData=data)
    if(jsonData==undefined){
        window.location.href="http://localhost:3000/error"
    }
    if(jsonData.length!=0){
        document.querySelector(".inside-square").style.display=""
    }
    try {
        await fetchOrders().then(res=> res.json()).then(data=>jsonData=data)

    }
    catch (err){
        window.location.href="http://localhost:3000/error"
    }
    let clone=[]
    let i=0;
    document.querySelectorAll(".order-box").forEach(element=>{
        if(element.style.display=="")
            element.remove();
    })
    jsonData.forEach(element=>{
        clone.push(document.querySelector(".order-box").cloneNode(true))
        clone[i].style.display="";
        clone[i].querySelector(".date").innerHTML=element.orderTime.slice(8,10) + "." + element.orderTime.slice(5,7) + "." + element.orderTime.slice(0,4);
        clone[i].querySelector(".date2").innerHTML=element.deliveryTime.slice(8,10) + "." + element.deliveryTime.slice(5,7) + "." + element.deliveryTime.slice(0,4)
        clone[i].querySelector(".time").innerHTML=element.deliveryTime.slice(11,16)
        clone[i].querySelector(".dish-cost").innerHTML=element.price
        clone[i].querySelector(".date3").innerHTML=element.deliveryTime.slice(8,10) + "." + element.deliveryTime.slice(5,7) + "." + element.deliveryTime.slice(0,4)
        clone[i].querySelector(".time2").innerHTML=element.deliveryTime.slice(11,16)
        clone[i].querySelector(".clickable-order-box").addEventListener("click",()=>{
            window.location.href=`http://localhost:3000/order/${element.id}`
        })
        if(element.status=="InProcess"){
            clone[i].querySelector(".delivered").style.display="none"
            clone[i].querySelector(".unDelivered").style.display=""
            clone[i].querySelector(".accept-button").style.display=""
            clone[i].querySelector(".status").innerHTML="В обработке"
            clone[i].querySelector(".accept-button").addEventListener("click",(event)=>{
            acceptDelivery(element.id);
               event.target.parentElement.querySelector(".delivered").style.display=""
               event.target.parentElement.querySelector(".unDelivered").style.display="none"
               event.target.parentElement.querySelector(".accept-button").style.display="none"
                event.target.parentElement.querySelector(".status").innerHTML="Доставлен"
            })
        }
        document.querySelector(".orders-list").appendChild(clone[i]);
        i++;
    })

}

document.addEventListener("DOMContentLoaded", () => {
    const footer = document.querySelector(".footer")
    fetch("/html/footer.html").then(res => res.text()).then(data2 => footer.innerHTML = data2)
    renderOrders()
});