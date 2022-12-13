import {checkRatingPossibility, setRating} from "./auxiliary.js";

const idRegexp=new RegExp("item/([A-z0-9-]*)");
let pageJson;
async function render(){
    let elemId;
    let url= window.location.href;
    if(idRegexp.exec(url)!=null){
        elemId=idRegexp.exec(url)[1];
    }
    var urlForFetch=`https://food-delivery.kreosoft.ru/api/dish/${elemId}`;
    pageJson= await fetchElem(urlForFetch);
    if(!pageJson){
        window.location.href="http://localhost:3000/error"
    }
    document.querySelector(".dish-category").innerHTML+=pageJson.category;
    document.querySelector(".dish-name").innerHTML=pageJson.name;
    document.querySelector("title").innerHTML=pageJson.name
    document.querySelector(".dish-name").innerHTML=pageJson.name;
    document.querySelector(".dish-cost").innerHTML+=pageJson.price+" руб/штука";
    document.querySelector(".dish-description").innerHTML=pageJson.description
    const starPercentage=(pageJson.rating/10) * 100;
    const starPercantageRounded= `${starPercentage}%`;
    document.querySelector(".stars-inner").style.width=starPercantageRounded;
    document.querySelector(".image-size").src=pageJson.image
    if(pageJson.vegetarian==false){
        document.querySelector(".isVegetarian").innerHTML="Не вегетерианское";
    }
    else{
        document.querySelector(".isVegetarian").innerHTML="Вегетерианское";
    }
    await checkRatingPossibility(elemId).then(res=>{
        if(res.status==200) return res.json();}).
    then(json=>pageJson=json)

    if(pageJson==true) {
        let userRating;
        let previousWidth = document.querySelector(".stars-inner").style.width;
        document.querySelector(".stars-outer").addEventListener("mousemove", (event) => {
            event.target.parentElement.querySelector(".stars-inner").style.width = `${Math.round(event.offsetX / 18) * 18}px`
             userRating = `${Math.round(event.offsetX / 18) * 18}px`
        })
        document.querySelector(".stars-outer").addEventListener("mouseleave",(event)=>{
            event.target.parentElement.querySelector(".stars-inner").style.width = previousWidth
        })
        document.querySelector(".stars-outer").addEventListener("click", async () => {
            previousWidth=userRating
            await setRating(elemId, userRating.slice(0,userRating.length-2) / 18);
        })

    }
}
async function fetchElem(urlForFetch){
    var response = await fetch(urlForFetch);
    if(response.status==200) return response.json()
    return false
}
document.addEventListener("DOMContentLoaded", () => {
    const footer = document.querySelector(".footer")
    fetch("/html/footer.html").then(res => res.text()).then(data2 => footer.innerHTML = data2)
    render();


})