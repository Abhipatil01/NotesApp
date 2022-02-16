const fs = require('fs');
const chalk = require('chalk');

// console log with color
const log = (message, color) => {
  if (color) {
    console.log(chalk[color].inverse(message));
  } else {
    console.log(message);
  }
};

// load notes
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

// Save notes
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

// Add Note
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.some((note) => note.title === title);
  if (duplicateNote) {
    log('Note title taken', 'red');
    return;
  }
  notes.push({
    title,
    body,
  });
  saveNotes(notes);
  log('Note added', 'green');
};

// Remove Note
const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);
  if (notes.length === notesToKeep.length) {
    log('Note not found', 'red');
    return;
  }
  saveNotes(notesToKeep);
  log('Note removed', 'green');
};
// List Notes
const listNotes = () => {
  const notes = loadNotes();
  log(`Printing ${notes.length} note(s)`, 'green');
  notes.forEach((note) => {
    log(`Title: ${note.title} Body: ${note.body}`);
  });
};
// Read Note
const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (!note) {
    log('Note not found', 'red');
    return;
  }
  log(`Title: ${note.title} Body: ${note.body}`);
};

module.exports = {
  addNote,
  removeNote,
  readNote,
  listNotes,
};
