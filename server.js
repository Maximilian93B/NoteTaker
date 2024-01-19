
// Import required Modules 
const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid') 

//Iinit express and set PORT -- > if not using enviroment port use 3000
const app = express();
const PORT = process.env.PORT || 3000; 

//Using Middleware for parsing JSON and urlencoded form data 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the static files from 'Develop/public' 
app.use(express.static('Develop/public'));



//Make GET route for homepage  
app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

//GET route for notes page 

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
  });
  

//API routes 
// Make a GET request to read the db.json and return the saved Notes to the user 
//Retrieve all notes 
app.get('/api/notes', (req,res)=>{

    // read and return notes from db.json
    fs.readFile('./Develop/db/db.json', 'utf-8', (err, data) =>{
        if (err) {
            // send error response 
            res.status(500).json({message: 'Error reading notes'});
        } else {

        res.json(JSON.parse(data));
        }
    });

});

// Post the endpoint to add new notes 
app.post('/api/notes', (req, res) => {

    //create a new note with a unique id using uuid
    const newNote = { ...req.body, id: uuid.v4() };

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


// Make DELETE request adn then use params to call the id of the note to delete

app.delete('/api/notes/:id', (req, res) => {

    //Remove note with specific id 
    const noteId = req.params.id; // Gets the note id     
    fs.readFile('./Develop/db/db.json', 'utf-8', (readErr, data)=>{
        // handle logic 
        if(readErr) {
            res.status(500).json({message: 'Error reading notes'});

        } else {
            let notes = JSON.parse(data); 
            notes = notes.filter(note => note.id !== noteId); // Remove the note associtaed with the id
            
            fs.writeFile('./Develop/db/db.json', JSON.stringify(notes), (writeErr)=>{
                if (writeErr) {
                    res.status(500).json({message: 'Error writting notes'});
                } else {
                    res.json({message: 'Note successfully deleted'});
                }
            });
        };
    });
});


// Start Server and set listener on PORT 
app.listen(PORT, () => {
    console.log(`There is a new Cook in the Kitchen ${PORT}`);

});

