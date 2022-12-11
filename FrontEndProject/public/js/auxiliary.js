const tokenRegexp= new RegExp("token=([A-z0-9._-]*)")


export async function checkIfAuthorized(){
    let jwt = tokenRegexp.exec(document.cookie)[1];

        return await Promise.resolve( fetch("https://food-delivery.kreosoft.ru/api/account/profile",{
            headers:{
                Authorization: "Bearer " + jwt
            }}));


}
export async function fetchBasket(){
   let jwt = tokenRegexp.exec(document.cookie)[1];

    return await Promise.resolve( fetch("https://food-delivery.kreosoft.ru/api/basket",{
        headers:{
            Authorization: "Bearer " + jwt
        }}));
}
export function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
export function setCookie(name, value, options = {}) {

    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

export async function postDish(element){
    let jwt = tokenRegexp.exec(document.cookie)[1];
    await fetch(`https://food-delivery.kreosoft.ru/api/basket/dish/${element}`,{
        method: 'POST',
        headers:{
            Authorization: "Bearer " + jwt
        }
    })
}
export async function deleteDish(element,shouldDecrease){
    let jwt = tokenRegexp.exec(document.cookie)[1];
    await fetch(`https://food-delivery.kreosoft.ru/api/basket/dish/${element}?increase=${shouldDecrease}`,{
        method: 'DELETE',
        headers:{
            Authorization: "Bearer " + jwt
        }
    })
}
export async function acceptOrder(setAddress, dateTime){
    let jwt = tokenRegexp.exec(document.cookie)[1];
    console.log(setAddress,dateTime)
    await fetch("https://food-delivery.kreosoft.ru/api/order",{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            Authorization: "Bearer " + jwt
        },
        body: JSON.stringify({
            deliveryTime: dateTime,
            address: setAddress
        })
    })
}
export  async function fetchOrders(){
    let jwt = tokenRegexp.exec(document.cookie)[1];
    return await Promise.resolve( fetch("https://food-delivery.kreosoft.ru/api/order",{
        method: 'GET',
        headers:{
            Authorization: "Bearer " + jwt
        }}));
}
export async function acceptDelivery(element){
    let jwt = tokenRegexp.exec(document.cookie)[1];
    await fetch(`https://food-delivery.kreosoft.ru/api/order/${element}/status`,{
        method: 'POST',
        headers:{
            Authorization: "Bearer " + jwt
        }
    })
}
export async function fetchOrder(id){

    let jwt = tokenRegexp.exec(document.cookie)[1];
    return await Promise.resolve( fetch(`https://food-delivery.kreosoft.ru/api/order/${id}`,{
        method: 'GET',
        headers:{
            Authorization: "Bearer " + jwt
        }}));
}

export async function changeProfile(json){
    let jwt = tokenRegexp.exec(document.cookie)[1];
    await fetch("https://food-delivery.kreosoft.ru/api/account/profile",{
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json',
            Authorization: "Bearer " + jwt
        },
        body: json
    })
}

export async function registerUser(data){
    let jwt = tokenRegexp.exec(document.cookie)[1];
    return await Promise.resolve( fetch("https://food-delivery.kreosoft.ru/api/account/register",{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "fullName": data[0].value,
            "password": data[6].value,
            "email": data[5].value,
            "address": data[3].value,
            "birthDate": data[4].value + "T00:00:00Z",
            "gender": data[1].value,
            "phoneNumber": data[2].value
        })
    }));
}

export async function loginUser(data){
    let jwt = tokenRegexp.exec(document.cookie)[1];
    return await Promise.resolve( fetch("https://food-delivery.kreosoft.ru/api/account/login", {
        method: 'POST',
        body: JSON.stringify(
            {
                "email": data[0].value,
                "password": data[1].value,
            }),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    }) );
}