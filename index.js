const express = require('express');
const app = express();

const data = require('./data');

app.get('/api/persons', (req, res) => res.json(data.Persons));

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = data.Persons.filter(p => p.id === id);
  res.json(person);
});

app.get('/info', (req, res) => res.send(data.info));

const PORT = 3001;

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));