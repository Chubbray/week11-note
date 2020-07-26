const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/noteTaker_db.json", (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        for (var i = 0; i < notes.length; i++) {
            notes[i].id = i;
        };
        res.json(notes);
    });
});

app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    fs.readFile(__dirname + "/noteTaker_db.json", (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile(__dirname + "/noteTaker_db.json", JSON.stringify(notes), (err, data) => {
            if (err) throw err;
            res.json(newNote);
        })
    })
});

app.delete("/api/notes/:noteId", function (req, res) {
    const id = req.params.noteId;
    fs.readFile(__dirname + "/noteTaker_db.json", (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        notes.splice(id, 1);
        fs.writeFile(__dirname + "/noteTaker_db.json", JSON.stringify(notes), (err, data) => {
            if (err) throw err;
            res.send("ok");
        })
    })
});

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT);
