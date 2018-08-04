//writing JSON to file:

const fs = require("fs");

var originalNote = {
  title: "My title",
  body: "My Body",
};

  

var originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync("notes.json", originalNoteString);

var noteString = fs.readFileSync("notes.json")
var note = JSON.parse(noteString);
console.log(note.title);
