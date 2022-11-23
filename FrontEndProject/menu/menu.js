let isVegetarian;
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
   console.log(response.json())
    return response.json()
}
async function renderPage(){
   var pageJson = await getDishes();
    pageJson.dishes.forEach(element => {
        
    })
}
document.addEventListener("DOMContentLoaded", () =>{
    isVegetarian=false;
    renderPage();
    document.querySelector(".clicker").addEventListener("click", ()=>{
        isVegetarian=!isVegetarian;
    })
    document.querySelector(".filter-button").addEventListener("click", ()=>{
       renderPage();
    });

})