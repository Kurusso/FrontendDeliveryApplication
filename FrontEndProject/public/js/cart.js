import {fetchBasket} from "./auxiliary.js";
import {postDish} from "./auxiliary.js";
import {deleteDish} from "./auxiliary.js";

async function render(){
    var responseData;
        await fetchBasket().then(res=> {
            if(res.status==200) return res.json()
        }).then(data=>responseData=data);
    if(responseData==undefined){
        window.location.href="http://localhost:3000/error"
    }
    let clone=[]
    let i=0;
    document.querySelectorAll(".cart-dish-box").forEach(element=>{
        if(element.style.display=="")
            element.remove();
    })
    responseData.forEach(element=>{

        clone.push(document.querySelector(".cart-dish-box").cloneNode(true))
        clone[i].style.display="";
        clone[i].querySelector(".number").innerHTML=i+1;
        clone[i].querySelector(".image-size").src=element.image
        clone[i].querySelector(".dish-name").innerHTML=element.name
        clone[i].querySelector(".dish-cost").innerHTML+=element.price
        clone[i].querySelector(".input-number").value=element.amount
        document.querySelector(".cart-dish-list").appendChild(clone[i]);
        clone[i].querySelector(".quantity-left-minus").addEventListener("click",(event)=>{
            let elem = event.target;
            if(elem.parentElement.nextSibling.nextSibling.value>1) {
                elem.parentElement.nextSibling.nextSibling.value--;
                deleteDish(element.id,true);
            }
        })
        clone[i].querySelector(".quantity-right-plus").addEventListener("click",(event)=>{
            let elem = event.target;
            elem.parentElement.previousSibling.previousSibling.value++;
            postDish(element.id)
        })
        clone[i].querySelector(".delete-button").addEventListener("click",(event)=>{
            let elem =event.target
            deleteDish(element.id,false)
            elem.parentElement.remove()
            document.querySelector(".dish-amount").innerHTML--;
        })
        i++;
    })
}
document.addEventListener("DOMContentLoaded",()=>{
    const footer = document.querySelector(".footer")
    fetch("/html/footer.html").then(res=>res.text()).then(data2=>footer.innerHTML=data2)
    render()
    document.querySelectorAll(".input-group").forEach(element=>{
        element.querySelector(".quantity-left-minus").addEventListener("click",(event)=>{
            let element = event.target;
            if(element.parentElement.nextSibling.nextSibling.value>1) {
                element.parentElement.nextSibling.nextSibling.value--;
            }
        })
        element.querySelector(".quantity-right-plus").addEventListener("click",(event)=>{
            let element = event.target;
                element.parentElement.previousSibling.previousSibling.value++;
        })
    })

})
