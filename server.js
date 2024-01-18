
//Declare constants 
const express = require('express');
const path = require('path');
const fs = require('fs');


//init express and PORT 
const app = express();
const PORT = process.env.PORT || 3000; 

//Put Middleware for parsing JSON and urlencoded form data 
app.use(express.json());
app.use(express.urlencoded({extened: true}));
app.use(express.static('public'));

//Make GET route for homepage from public 

app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, './public/index.html'));
});
