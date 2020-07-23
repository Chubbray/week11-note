const express = require("express");
const app = express();

app.listen(3001, () => {
    console.log(`API server now on port 3001`);
});

const { note } = require("./data/note");
app.get("/api/note", (req, res) => {
    res.json(note);
});