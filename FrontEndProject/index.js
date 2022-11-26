// const http = require("http")
// const  fs = require('fs')
// const path = require('path')
//
// const server = http.createServer((req,res)=>{
//
//
// if(req.url === '/') {
//     fs.readFile(path.join('FrontEndProject', 'navbar', 'navbar.html'), (err, data) => {
//         if (err) {
//             throw  err;
//         }
//         res.writeHead(200, {
//             'Content-Type': 'text/html'
//         })
//         res.write(data)
//         res.end();
//     })
// }
//
//     })
// server.listen(3333,()=>{
//     console.log('server started')
// })


const express = require('express')
const app = express()
const port = 3000
const  fs = require('fs')
const path = require('path')

const createPath = (page) => path.resolve(__dirname,'public', 'html', `${page}.html`)
let basePath=''

app.use(express.static(__dirname + '/public'));
app.use('/js',express.static(__dirname + '/node_modules/jquery/dist'));

app.get('',(req,res) =>{

    res.sendFile(__dirname + '/public/html/menu.html')
})
app.get('/login',(req,res) =>{

    res.sendFile(__dirname + '/public/html/login.html')
})
app.get('/register',(req,res) =>{
    res.sendFile(__dirname + '/public/html/registration.html')
})
app.get(new RegExp('/'),(req,res) =>{
    res.sendFile(__dirname + '/public/html/menu.html')
})
app.listen(port,()=>{
    console.info(__dirname)
})
// ?(categories=(WOK|Soup|Pizza|Dessert|Drink)&?)*(vegitarian=(true|false)&?)?(sorting=(NameAsc|NameDesc|PriceAsc|PriceDesc|RatingAsc|RatingDesc)&?)?(page=[1-9]+[0-9]*)?