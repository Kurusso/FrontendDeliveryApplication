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
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use('/js',express.static(__dirname + '/node_modules/jquery/dist'));

app.get('',(req,res) =>{
    res.render('menu')
})
app.get('/login',(req,res) =>{
    res.render('login')
})
app.get('/register',(req,res) =>{
    res.render( 'registration')
})
app.get(new RegExp('^/item(/[A-z0-9-]+)$'),(req,res) =>{
    res.render('item')
})
app.get('/cart',(req,res)=>{
    res.render('cart');
})
app.get('/orders',(req,res)=>{
    res.render('orders')
})


app.listen(port,()=>{
    console.info(__dirname)
})

// ?(categories=(WOK|Soup|Pizza|Dessert|Drink)&?)*(vegitarian=(true|false)&?)?(sorting=(NameAsc|NameDesc|PriceAsc|PriceDesc|RatingAsc|RatingDesc)&?)?(page=[1-9]+[0-9]*)?
//^/[?](categories=(WOK|Soup|Pizza|Dessert|Drink)&?)*(vegetarian=(true|false)&?)?(sorting=(NameAsc|NameDesc|PriceAsc|PriceDesc|RatingAsc|RatingDesc)&?)?(page=[1-9]+[0-9]*)?$