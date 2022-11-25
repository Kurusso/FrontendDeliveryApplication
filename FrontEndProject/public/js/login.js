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
        document.cookie = `token=${json.token}; path=/`;
        document.cookie = `username=${nickName}; path=/`;
    });
    console.log(document.cookie)
}

document.addEventListener("DOMContentLoaded", () =>{
    const nav = document.querySelector('.header')
    const footer = document.querySelector(".footer")
    fetch( '/html/navbar.html').then(res=>res.text()).then(data2=>nav.innerHTML=data2)
    fetch("/html/footer.html").then(res=>res.text()).then(data2=>footer.innerHTML=data2)
    document.querySelector(".register-button").addEventListener("click", ()=>{
         login()
    });

});