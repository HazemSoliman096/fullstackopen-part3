const express = require('express');
const morgan = require('morgan')

const data = require('./data');

const app = express();
app.use(express.json());

morgan.token('body', function (req, res) { return JSON.stringify(req.body) });

app.use(morgan(':method :url :response-time :body'));

app.use(express.static('assets'));

app.get('/api/persons', (req, res) => res.json(data.Persons));

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = data.Persons.filter(p => p.id === id);
  res.json(person);
});

app.get('/info', (req, res) => res.send(data.info));

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

app.get('/', (req, res) => {
  res.sendFile('index.html', {
      root: path.join(__dirname, './assets/')
  })
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));