document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector('.header')
    const footer = document.querySelector(".footer")
    fetch('/html/navbar.html').then(res => res.text()).then(data2 => nav.innerHTML = data2)
    fetch("/html/footer.html").then(res => res.text()).then(data2 => footer.innerHTML = data2)
})