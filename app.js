const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes");

const titleOptions = {
    describe: "Title of note",
    demand: true, //mandatory argument
    alias: "t", //set flag in CLI
}

const bodyOptions = {
    describe: "Body of note",
    demand: true, //mandatory argument
    alias: "b", //set flag in CLI
}

const argv = yargs
            .command("add", "Add a new  new", {
              title: titleOptions,
              body: bodyOptions,
            })
            .command("list", "List all notes")
            .command("read", "Read a note", {
              title: titleOptions
            })
            .command("remove", "Remove a note", {
              title: titleOptions
            })
            .help()
            .argv;

let command = argv._[0];

if (command === "add"){
  let note = notes.addNote(argv.title, argv.body);
  if (note){
    notes.logNote(note);
  }
  else {
    console.log("Note title must be unique")
  }
}
else if (command === "list"){
  let allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`)
  allNotes.forEach( note => notes.logNote(note) )
}
else if (command === "read"){
  let note = notes.getNote(argv.title);
  if (note){
    console.log("Note found.")
    notes.logNote(note);
  }
  else {
    console.log("Note not found.")
  }
}
else if (command === "remove"){
  let noteRemoved = notes.removeNote(argv.title);
  let message = noteRemoved ? "Note was removed." : "Note not found.";
  console.log(message);
}
else {
  console.log("Command not recognized.")
}
