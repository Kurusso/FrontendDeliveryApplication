
document.addEventListener("DOMContentLoaded",()=>{
    const footer = document.querySelector(".footer")
    fetch("/html/footer.html").then(res=>res.text()).then(data2=>footer.innerHTML=data2)
    render();
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
