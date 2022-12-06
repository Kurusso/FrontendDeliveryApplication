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