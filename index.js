const { response } = require('express');
const express = require('express');
const app = express();

const data = require('./data');

app.use(express.json());

app.get('/api/persons', (req, res) => res.json(data.Persons));

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = data.Persons.filter(p => p.id === id);
  res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = data.Persons.filter(p => p.id !== id);
  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const person = req.body;

  if (!person.name || !person.number) {
    return res.status(400).json({
      error: 'The name or number is missing'
    });
  }

  if (data.Persons.map(p => p.name).includes(person.name)) {
    return res.status(400).json({
      error: 'The name already exists in the phonebook'
    });
  }

  person.id = Math.floor(Math.random() * ((data.Persons.length * 10) - (data.Persons.length)) + (data.Persons.length));

  data.Persons.concat(person);
  res.json(person);
});

app.get('/info', (req, res) => res.send(data.info));

const PORT = 3001;

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));