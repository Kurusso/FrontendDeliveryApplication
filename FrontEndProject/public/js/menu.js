import {fetchBasket} from "./auxiliary.js"
import {postDish} from "./auxiliary.js";
import {deleteDish} from "./auxiliary.js";

let isVegetarian;
let pageJson;
let currentPage=1;
const pageRegexp= new RegExp("page=([1-9]+[0-9]*)")
const sortByRegexp= new RegExp("sorting=(NameAsc|NameDesc|PriceAsc|PriceDesc|RatingAsc|RatingDesc)")
const categoriesRegexp = new RegExp("categories=(WOK|Soup|Pizza|Dessert|Drink)")
const vegetarianRegexp = new RegExp("vegetarian=(true|false)")
async function changeLink(){

    let data = document.querySelectorAll(".data-field");
    var selected = [];
    for (var option of document.querySelector('.dish').options)
    {
        if (option.selected) {
            selected.push(option.value);
        }
    }
    let url=`http://localhost:3000/?`;
    selected.forEach(element => url=url+`categories=${element}&`);
    url=url+`vegetarian=${isVegetarian}&sorting=${data[1].value}`
    window.location.href=url;

}
async function changePage(){
    var url=window.location.href;
    var page = url.search(pageRegexp);
    if (page!=-1){
        url=url.slice(0,page+5)
        url+=currentPage;
    }
    else{
        if(url[url.length-1]=='/'){
            url += `?page=${currentPage}`;
        }
            else {
            url += `&page=${currentPage}`;
        }
    }
window.location.href=url;
}
async function FetchMenu(urlForFetch){
    var response = await fetch(urlForFetch);
    return response.json()
}
function checkIfInCart(dish,cart){
   return  cart.filter(element=> element.id == dish.id)
}
async function urlConstructor(){
    let url= window.location.href;
    let pageNumber;
    let sortBy;
    let vegetarian;
    if(pageRegexp.exec(url)!=null){
        pageNumber=pageRegexp.exec(url)[1];
    }
    if(sortByRegexp.exec(url)!=null){
        sortBy = sortByRegexp.exec(url)[1];
    }
    if(vegetarianRegexp.exec(url)!=null){
        vegetarian = vegetarianRegexp.exec(url)[1];
    }
    let urlForFetch="https://food-delivery.kreosoft.ru/api/dish?"
    let categories =[]
    let m;
    do {
        m = categoriesRegexp.exec(url);
        if (m) {
            url= url.slice(m.index+m[0].length)
            categories.push(m[1])
        }
    } while (m!=null);
    categories.forEach(element => urlForFetch=urlForFetch+`categories=${element}&`);
    if(vegetarian!=null) {
        urlForFetch = urlForFetch + `vegetarian=${vegetarian}`
    }
    else {
        urlForFetch = urlForFetch + `vegetarian=false`
    }
    if(vegetarian!=null) {
        urlForFetch = urlForFetch + `&sorting=${sortBy}`
    }
    else {
        urlForFetch = urlForFetch + `&sorting=NameAsc`
    }
    if (pageNumber!=null ) {
        urlForFetch = urlForFetch + `&page=${pageNumber}`
        currentPage=pageNumber;
    }
    else{
        urlForFetch = urlForFetch + `&page=${currentPage}`
    }
    return urlForFetch
}
async function renderPage(){

    var responseData;
    var logedIn;
    try {
        await fetchBasket().then(res=> res.json()).then(data=>responseData=data);
        logedIn=true
    }
    catch (err){
        logedIn=false
    }
    var urlForFetch= await urlConstructor();
    pageJson = await FetchMenu(urlForFetch);
   let clone = []
    let i=0;
   document.querySelectorAll(".dish-box").forEach(element=>{
       if(element.style.display=="")
           element.remove();
   })
    pageJson.dishes.forEach(element => {
        clone.push(document.querySelector(".dish-box").cloneNode(true))
        clone[i].style.display="";
        clone[i].querySelector(".image-size").src=element.image
        clone[i].querySelector(".dish-name").innerHTML=element.name
        clone[i].querySelector(".star-rating").innerHTML=element.rating
        clone[i].querySelector(".category-name").innerHTML+=element.category
        clone[i].querySelector(".dish-text").innerHTML=element.description
        clone[i].querySelector(".dish-cost").innerHTML+=element.price
        clone[i].querySelector(".dish-id").innerHTML=element.id
        if(element.vegetarian){
            clone[i].querySelector(".vegetarian").style.display=""
        }
        document.querySelector(".dish-list").appendChild(clone[i]);
        clone[i].querySelector(".padding-box").addEventListener("click", ()=>{
            window.location.href=`http://localhost:3000/item/${element.id}`
        })
        if(logedIn){
        clone[i].querySelector(".add-button").addEventListener("click",(event)=>{
            var elem=event.target
             postDish(element.id);
            elem.style.display="none"
            elem.nextSibling.nextSibling.style.display=""
            elem.nextSibling.nextSibling.querySelector(".input-number").value=1
            document.querySelector(".dish-amount").innerHTML++;
        })
            let check=checkIfInCart(element,responseData)
           if(check.length!=0){

               clone[i].querySelector(".add-button").style.display="none"
               clone[i].querySelector(".counter").style.display=""
               clone[i].querySelector(".input-number").value=check[0].amount
           }
            clone[i].querySelector(".quantity-left-minus").addEventListener("click",(event)=>{
                let elem = event.target;
                if(elem.parentElement.nextSibling.nextSibling.value>0) {
                    elem.parentElement.nextSibling.nextSibling.value--;
                    deleteDish(element.id,true);
                    if(elem.parentElement.nextSibling.nextSibling.value==0){
                        elem.parentElement.parentElement.parentElement.parentElement.style.display="none"
                        elem.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".add-button").style.display=""
                        document.querySelector(".dish-amount").innerHTML--;
                    }
                }
            })
            clone[i].querySelector(".quantity-right-plus").addEventListener("click",(event)=>{
                let elem = event.target;
                elem.parentElement.previousSibling.previousSibling.value++;
                postDish(element.id)
            })
        }
        i++;
    })

    let pages=document.querySelectorAll(".page-link")
    if((pageJson.pagination.current!=1 && pageJson.pagination.current!=pageJson.pagination.count) || pageJson.pagination.current==2){
        pages[1].innerHTML=pageJson.pagination.current - 1;
        pages[2].innerHTML=pageJson.pagination.current;
        pages[2].style.background="#0D6EFD"
        pages[2].style.color="white"
        pages[3].innerHTML=pageJson.pagination.current + 1;
    }
    else if(pageJson.pagination.current==1){
        pages[1].innerHTML=pageJson.pagination.current ;
        pages[1].style.background="#0D6EFD"
        pages[1].style.color="white"
        pages[2].innerHTML=pageJson.pagination.current + 1;
        pages[3].innerHTML=pageJson.pagination.current + 2;
    }
    else {
        pages[1].innerHTML=pageJson.pagination.current -2;
        pages[2].innerHTML=pageJson.pagination.current - 1;
        pages[3].innerHTML=pageJson.pagination.current;
        pages[3].style.background="#0D6EFD"
        pages[3].style.color="white"
    }
}

document.addEventListener("DOMContentLoaded", () =>{

    const footer = document.querySelector(".footer")

    fetch("/html/footer.html").then(res=>res.text()).then(data2=>footer.innerHTML=data2)
    isVegetarian=false;
    renderPage();
    if(!window.location.href.match(new RegExp(`0/([?](categories=(WOK|Soup|Pizza|Dessert|Drink)&?)*(vegetarian=(true|false)&?)?(sorting=(NameAsc|NameDesc|PriceAsc|PriceDesc|RatingAsc|RatingDesc)&?)?(page=[1-9]+[0-9]*)?)?$`))){
        window.location.href="https://e7.pngegg.com/pngimages/60/588/png-clipart-oops-illustration-green-stunned-the-explosion-stickers-text-logo.png"
    }
    let firstPageElement = document.querySelector(".page-link-1");
    let secondPageElement = document.querySelector(".page-link-2");
    let thirdPageElement = document.querySelector(".page-link-3");
    document.querySelector(".clicker").addEventListener("click", ()=>{
        isVegetarian=!isVegetarian;
    })
    document.querySelector(".filter-button").addEventListener("click", ()=>{
        changeLink();
       console.log(window.location.href)
    });


    document.querySelector(".page-link-back").addEventListener("click",()=>{
        if(currentPage>1) {
            currentPage--;
        }
        changePage();
    })
    document.querySelector(".page-link-next").addEventListener("click",()=>{
        if(currentPage<pageJson.pagination.count) {
            currentPage++;
        }
        changePage();
    })

    document.querySelector(".page-item-first").addEventListener("click",()=>{
        if(firstPageElement.innerHTML<=pageJson.pagination.count) {
        currentPage=firstPageElement.innerHTML;
        }
        changePage();
    })
    document.querySelector(".page-item-second").addEventListener("click",()=>{
        if(secondPageElement.innerHTML<=pageJson.pagination.count) {
        currentPage=secondPageElement.innerHTML;}
        changePage();
    })
    document.querySelector(".page-item-third").addEventListener("click",()=>{
        if(thirdPageElement.innerHTML<=pageJson.pagination.count) {
        currentPage=thirdPageElement.innerHTML;
        }
        changePage();
    })

})

