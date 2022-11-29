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
    console.log(pageJson)
    document.querySelector(".dish-category").innerHTML+=pageJson.category;
    document.querySelector(".dish-name").innerHTML=pageJson.name;
    document.querySelector(".dish-name").innerHTML=pageJson.name;
    document.querySelector(".dish-cost").innerHTML+=pageJson.price+" руб/штука";
    document.querySelector(".dish-description").innerHTML=pageJson.description
    document.querySelector(".star-rating").innerHTML=pageJson.rating
    document.querySelector(".image-size").src=pageJson.image
    if(pageJson.vegetarian==false){
        document.querySelector(".isVegetarian").innerHTML="Не вегетерианское";
    }
    else{
        document.querySelector(".isVegetarian").innerHTML="Вегетерианское";
    }
}
async function fetchElem(urlForFetch){
    var response = await fetch(urlForFetch);
    return response.json()
}
document.addEventListener("DOMContentLoaded", () => {
    const footer = document.querySelector(".footer")
    fetch("/html/footer.html").then(res => res.text()).then(data2 => footer.innerHTML = data2)
    render();
})