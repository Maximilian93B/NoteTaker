
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

//GET  route for notes page 

app.get('/notes', (res, req) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//API routes 
// Make a GET request to read the db.json and return the saved Notes to the user 

app.get('/api/notes', (req,res)=>{
 const newNote = req.body;
// include UUID 
    
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    if (err) throw err;
        res.json(JSON.parse(data));

    
        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
    if (err) throw err;
    res.json(newNote);
    });
 });

});


// Start Server on PORT 

app.listen(PORT, () => {
    console.log ('There is a new Cook in the Kitchen ${PORT}')
});

