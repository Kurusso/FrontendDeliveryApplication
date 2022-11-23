function register() {
    let data = document.querySelectorAll(".data-field");
    fetch("https://food-delivery.kreosoft.ru/api/account/login", {
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
    console.log("teat")
    document.querySelector(".login-button").addEventListener("click", ()=>{
        register();
    });

});