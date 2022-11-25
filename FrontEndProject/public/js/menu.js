let isVegetarian;
var pageJson
async function getDishes(){
    let data = document.querySelectorAll(".data-field");
    var selected = [];
    for (var option of document.querySelector('.dish').options)
    {
        if (option.selected) {
            selected.push(option.value);
        }
    }
    let url=`https://food-delivery.kreosoft.ru/api/dish?`;
    selected.forEach(element => url=url+`categories=${element}&`);
    url=url+`vegetarian=${isVegetarian}&sorting=${data[1].value}&page=1`
   var response = await fetch(url);
    return response.json()
}
async function renderPage(){
    pageJson = await getDishes();
    location.hash = "?pg=" + pageJson.pagination.current;
   let clone = []
    let i=0;
   document.querySelectorAll(".dish-box").forEach(element=>{
       if(element.style.display=="")
           element.remove();
   })
   console.log(pageJson)
    pageJson.dishes.forEach(element => {
        clone.push(document.querySelector(".dish-box").cloneNode(true))
        clone[i].style.display="";
        clone[i].querySelector(".image-size").src=element.image
        clone[i].querySelector(".dish-name").innerHTML=element.name
        clone[i].querySelector(".category-name").innerHTML+=element.category
        clone[i].querySelector(".dish-text").innerHTML=element.description
        clone[i].querySelector(".dish-cost").innerHTML+=element.price
        document.querySelector(".dish-list").appendChild(clone[i]);
        i++;
    })
    let pages=document.querySelectorAll(".page-link")
    if(pageJson.pagination.current!=1 && pageJson.pagination.current!=pageJson.pagination.count){
    pages[1].innerHTML=pageJson.pagination.current - 1;
    pages[2].innerHTML=pageJson.pagination.current;
    pages[3].innerHTML=pageJson.pagination.current + 1;
    }
    else if(pageJson.pagination.current==1){
        pages[1].innerHTML=pageJson.pagination.current ;
        pages[2].innerHTML=pageJson.pagination.current + 1;
        pages[3].innerHTML=pageJson.pagination.current + 2;
    }
    else {
        pages[1].innerHTML=pageJson.pagination.current -2;
        pages[2].innerHTML=pageJson.pagination.current - 1;
        pages[3].innerHTML=pageJson.pagination.current;
    }
}
document.addEventListener("DOMContentLoaded", () =>{
    const nav = document.querySelector('.header')
    const footer = document.querySelector(".footer")
    fetch( '/html/navbar.html').then(res=>res.text()).then(data2=>nav.innerHTML=data2)
    fetch("/html/footer.html").then(res=>res.text()).then(data2=>footer.innerHTML=data2)
    isVegetarian=false;
    renderPage();
    document.querySelector(".clicker").addEventListener("click", ()=>{
        isVegetarian=!isVegetarian;
    })
    document.querySelector(".filter-button").addEventListener("click", ()=>{
       renderPage();
       console.log(window.location.href)
    });

})