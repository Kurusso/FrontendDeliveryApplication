let isVegetarian;
var pageJson
let currentPage=1;
var pageRegexp= new RegExp("page=([1-9]+[0-9]*)")
var sortByRegexp= new RegExp("sorting=(NameAsc|NameDesc|PriceAsc|PriceDesc|RatingAsc|RatingDesc)")
var categoriesRegexp = new RegExp("categories=(WOK|Soup|Pizza|Dessert|Drink)")
var vegetarianRegexp = new RegExp("vegetarian=(true|false)")
async function changeLink(){

    let data = document.querySelectorAll(".data-field");
    var selected = [];
    for (var option of document.querySelector('.dish').options)
    {
        if (option.selected) {
            selected.push(option.value);
        }
    }
    let url=`http://localhost:3000/`;
    selected.forEach(element => url=url+`categories=${element}&`);
    url=url+`vegetarian=${isVegetarian}&sorting=${data[1].value}&page=${currentPage}`
    window.location.href=url;

}
async function changePage(){
    var url=window.location.href;
    var page = url.search(pageRegexp);
    if (page!=null){
        url=url.slice(0,page+5)
        url+=currentPage;
    }
    else{
        url+=`&page=${currentPage}`;
    }
window.location.href=url;
}
async function FetchMenu(urlForFetch){
    var response = await fetch(urlForFetch);
    return response.json()
}
async function urlConstructor(){
    let url= window.location.href;
    console.log(url,"url");
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
    if (pageNumber!=null) {
        urlForFetch = urlForFetch + `&page=${pageNumber}`
        currentPage=pageNumber;
    }
    else{
        urlForFetch = urlForFetch + `&page=${currentPage}`
    }
    return urlForFetch
}
async function renderPage(){
    var urlForFetch= await urlConstructor();
    pageJson = await FetchMenu(urlForFetch);
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
        changeLink();
       console.log(window.location.href)
    });

    window.addEventListener('popstate', ()=>{
        renderPage();
    });
    const pushUrl = (href) => {
        history.pushState({}, '', href);
        window.dispatchEvent(new Event('popstate'));
    };

    document.querySelector(".page-link").addEventListener("click",()=>{
        console.log("test")
        currentPage--;
        changePage();
    })
})

