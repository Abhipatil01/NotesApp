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
// List Notes
// Read Note

module.exports = {
  addNote,
};
