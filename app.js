const yargs = require('yargs');
const { addNote } = require('./notes.js');

// version
yargs.version('1.0.0');

// Read a note
yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler: function (argv) {
    console.log('Reading note', argv.title);
  },
});

// List
yargs.command({
  command: 'list',
  describe: 'List notes',
  handler: function (argv) {
    console.log('Listing all notes');
  },
});

// Add a note
yargs.command({
  command: 'add',
  describe: 'Add a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler: function ({ title, body }) {
    addNote(title, body);
  },
});

// Remove a note
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler: function (argv) {
    console.log('Removing note', argv.title);
  },
});

yargs.parse();
