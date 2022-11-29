import {checkIfAuthorized} from "./auxiliary.js";

async function renderNav(){

    var isAuthorized = await checkIfAuthorized();
    console.log(isAuthorized)
    if (isAuthorized.status==200) {
        console.log("rer")
        document.querySelectorAll(".optional").forEach(element => {
            console.log(" element.style.display")
        })
    }
}
document.addEventListener("DOMContentLoaded",  () => {
    renderNav()
})