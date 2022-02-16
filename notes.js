const fs = require('fs');

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
    console.log('Note title taken');
    return;
  }
  notes.push({
    title,
    body,
  });
  saveNotes(notes);
  console.log('Note added');
};

// Remove Note
const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);
  if (notes.length === notesToKeep.length) {
    console.log('Note not found');
    return;
  }
  saveNotes(notesToKeep);
  console.log('Note removed');
};
// List Notes
const listNotes = () => {
  const notes = loadNotes();
  console.log(`Printing ${notes.length} note(s)`);
  notes.forEach((note) => {
    console.log(`Title: ${note.title} Body: ${note.body}`);
  });
};
// Read Note
const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (!note) {
    console.log('Note not found');
    return;
  }
  console.log(`Title: ${note.title} Body: ${note.body}`);
};

module.exports = {
  addNote,
  removeNote,
  readNote,
  listNotes,
};
