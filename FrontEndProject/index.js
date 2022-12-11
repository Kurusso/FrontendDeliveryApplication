
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
app.get('/purchase',(req,res)=>{
    res.render('purchase')
})
app.get('/profile' ,(req,res)=>{
    res.render('profile')
})
app.get(new RegExp('^/order(/[A-z0-9-]+)$'),(req,res) =>{
    res.render('order')
})
app.listen(port,()=>{
    console.info(__dirname)
})
