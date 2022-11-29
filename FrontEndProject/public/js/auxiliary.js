

export async function checkIfAuthorized(){
    let jwt = document.cookie.slice(496)
        return await Promise.resolve( fetch("https://food-delivery.kreosoft.ru/api/order",{
            headers:{
                Authorization: "Bearer " + jwt
            }}));


}