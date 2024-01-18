
//Declare constants 
const express = require('express');
const path = require('path');
const fs = require('fs');
const { stringify } = require('querystring');


//init express and PORT 
const app = express();
const PORT = process.env.PORT || 3000; 

//Put Middleware for parsing JSON and urlencoded form data 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('Develop/public'));



//Make GET route for homepage from public 

app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

//GET  route for notes page 

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
  });
  

//API routes 
// Make a GET request to read the db.json and return the saved Notes to the user 

app.get('/api/notes', (req,res)=>{
 const newNote = req.body;
// include UUID 
    
    fs.readFile('./Develop/db/db.json', 'utf-8', (readErr, data) => {
    if (readErr) {
        //handle error
    } else {

        let note = newNote.JSON.parse(data);

        fs.writeFile('./Develop/db/db.json', JSON,stringify(notes), (writeErr)=>{
            if(writeErr) {
                throw writeErr;
            } else {
                // hanlde success 
            }
        })
    }
       
 });

});


// Start Server on PORT 

app.listen(PORT, () => {
    console.log ('There is a new Cook in the Kitchen ${PORT}')
});

