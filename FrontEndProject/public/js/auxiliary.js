const tokenRegexp= new RegExp("token=([A-z0-9.]*)")

export async function checkIfAuthorized(){
    let jwt = tokenRegexp.exec(document.cookie)[1];
    console.log(document.cookie)
        return await Promise.resolve( fetch("https://food-delivery.kreosoft.ru/api/account/profile",{
            headers:{
                Authorization: "Bearer " + jwt
            }}));


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