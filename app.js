const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/public'));

app.listen(3001, ()=>{
        console.log('Servidor corriendo');
});



app.get("/", (req, res) =>{
        res.sendFile(path.resolve('./views/user/index.html'))
});
app.get("/login", (req, res) =>{
        res.sendFile(path.resolve('./views/user/login.html'))
});
app.get("/carrito", (req, res) =>{
        res.sendFile(path.resolve('./views/products/productCart.html'))
});
app.get("/detalle-producto", (req, res) =>{
        res.sendFile(path.resolve('./views/products/productDetail.html'))
});
app.get("/registro", (req, res) =>{
        res.sendFile(path.resolve('./views/user/register.html'))
});