import {fetchOrder} from "./auxiliary.js";

const idRegexp=new RegExp("order/([A-z0-9-]*)");
function parseStatus(status){
    if(status=="Delivered"){
        return "Доставлен"
    }
    else {
        return "В обработке"
    }
}
async function renderOrder(){
    var url=window.location.href
    var elemId;
    var orderJSON;
    if(idRegexp.exec(url)!=null){
        elemId=idRegexp.exec(url)[1];
    }
   await fetchOrder(elemId).then(res=>res.json()).then(data=>orderJSON=data);

    document.querySelector(".order-date").innerHTML=orderJSON.orderTime.slice(8,10) + "." +
        orderJSON.orderTime.slice(5,7) + "." + orderJSON.orderTime.slice(0,4) + " " + orderJSON.orderTime.slice(11,16);
    document.querySelector(".delivery-date").innerHTML=orderJSON.deliveryTime.slice(8,10) + "." +
        orderJSON.deliveryTime.slice(5,7) + "." + orderJSON.deliveryTime.slice(0,4) + " " + orderJSON.deliveryTime.slice(11,16);
    document.querySelector(".order-address").innerHTML=orderJSON.address
    document.querySelector(".order-status").innerHTML=parseStatus(orderJSON.status)
    document.querySelector(".date-of-order").innerHTML=orderJSON.orderTime.slice(8,10) + "." + orderJSON.orderTime.slice(5,7) + "." + orderJSON.orderTime.slice(0,4);
    let orderCost=0;
    let clone=[]
    let i=0;
    document.querySelectorAll(".cart-dish-box").forEach(element=>{
        if(element.style.display=="")
            element.remove();
    })
   orderJSON.dishes.forEach(element=>{
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
    document.querySelector(".full-order-price").innerHTML=orderCost;
}
document.addEventListener("DOMContentLoaded",()=>{
    const footer = document.querySelector(".footer")
    fetch("/html/footer.html").then(res=>res.text()).then(data2=>footer.innerHTML=data2)
    renderOrder();
})