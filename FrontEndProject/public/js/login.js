async function login() {
    let data = document.querySelectorAll(".data-field");
    await fetch("https://food-delivery.kreosoft.ru/api/account/login", {
        method: 'POST',
        body: JSON.stringify(
            {
                "email": data[0].value,
                "password": data[1].value,
                }),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    }).then((response) => {
        if (response.status == 200) return response.json();
        else throw response;
    }).then((json) => {
        console.log(json.token)
        document.cookie = `token=${json.token}`;
    }).then(()=>{
        window.location.href="http://localhost:3000"
    });;

}

document.addEventListener("DOMContentLoaded", () =>{
    const footer = document.querySelector(".footer")
    fetch("/html/footer.html").then(res=>res.text()).then(data2=>footer.innerHTML=data2)
    document.querySelector(".register-button").addEventListener("click", ()=>{
         login()
    });

});