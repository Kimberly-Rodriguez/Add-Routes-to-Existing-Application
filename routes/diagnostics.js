const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  readFromFile('./db/diagnostics.json').then((data) => res.json(JSON.parse(data)));
});

diagnostics.post('/', (req, res) => {
  const { username, topic, tip } = req.body;

  if (req.body) {
    const newDiagnostic = {
      username,
      tip,
      topic,
      tip_id: uuid(),
    };

    readAndAppend(newDiagnostic, './db/diagnostics.json');
    res.json(`Diagnostic added successfully 🚀`);
  } else {
    res.error('Error in adding diagnostic');
  }
});

module.exports = diagnostics;
