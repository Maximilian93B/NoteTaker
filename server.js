
//Declare constants 
const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid') 

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
    fs.readFile('./Develop/db/db.json', 'utf-8', (err, data) =>{
        if (err) {
            // send error response 
            res.status(500).json({message: 'Error reading notes'});
        } else {

        res.json(JSON.parse(data));
        }
    });

});


app.post('/api/notes', (req, res) => {
    const newNote = { ...req.body, id: uuid.v4() }; // Add a unique ID to the new note

    fs.readFile('./Develop/db/db.json', 'utf-8', (readErr, data) => {
        if (readErr) {
            res.status(500).json({ message: "Error reading notes" });
        } else {
            let notes = JSON.parse(data);
            notes.push(newNote); // Add the new note to the array

            fs.writeFile('./Develop/db/db.json', JSON.stringify(notes), (writeErr) => {
                if (writeErr) {
                    res.status(500).json({ message: "Error writing notes" });
                } else {
                    res.json(newNote); // Send back the new note
                }
            });
        }
    });
});


// Start Server and set listener on PORT 
app.listen(PORT, () => {
    console.log(`There is a new Cook in the Kitchen ${PORT}`);

});

