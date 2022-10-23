const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/public'));

app.listen(3000, ()=>{
        console.log('Servidor corriendo');
});



app.get("/", (req, res) =>{
        res.sendFile(path.resolve('./views/index.html'))
});