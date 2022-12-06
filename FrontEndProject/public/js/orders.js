async function renderOrders(){
    console.log((document.querySelector(".dish-amount").innerHTML))
    if(document.querySelector(".dish-amount").innerHTML==0){
        document.querySelector(".inside-square").style.display="none"
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const footer = document.querySelector(".footer")
    fetch("/html/footer.html").then(res => res.text()).then(data2 => footer.innerHTML = data2)
    renderOrders()
});