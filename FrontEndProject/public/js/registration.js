async function register() {
    let data = document.querySelectorAll(".data-field");
    await fetch("https://food-delivery.kreosoft.ru/api/account/register", {
        method: 'POST',
        body: JSON.stringify(
            {"fullName": data[0].value,
            "password": data[6].value,
            "email": data[5].value,
            "address": data[3].value,
            "birthDate": data[4].value + "T00:00:00Z",
            "gender": parseGender(data[1].value),
            "phoneNumber": data[2].value}),
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
function parseGender(gender){
   if(gender==1){
       return "Male"
   }
   else{
       return  "Female"
   }
}
document.addEventListener("DOMContentLoaded", () =>{
    console.log("teat")
    const nav = document.querySelector('.header')
    const footer = document.querySelector(".footer")
    fetch( '/html/navbar.html').then(res=>res.text()).then(data2=>nav.innerHTML=data2)
    fetch("/html/footer.html").then(res=>res.text()).then(data2=>footer.innerHTML=data2)
   document.querySelector(".register-button").addEventListener("click", ()=>{
       register();
   });

});