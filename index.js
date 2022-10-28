const express = require('express');
const morgan = require('morgan');
const PhoneBook = require('./db');

const app = express();

app.use(express.static('assets'));
app.use(express.json());

morgan.token('body', function (req, res) { return JSON.stringify(req.body) });

app.use(morgan(':method :url :response-time :body'));


const errorHandler = (err, req, res, next) => {
  console.error(err.message)
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  next(err)
}

app.use(errorHandler)

app.get('/api/persons', (req, res) => {
  PhoneBook.find({})
    .then(phones => {
      console.log(phones);
      res.json(phones);
    });
});

app.get('/api/persons/:id', (req, res) => {
  PhoneBook.findById({_id: req.params.id})
    .then(person => {
      res.json(person);
    });
});

app.get('/info', (req, res) => {
  PhoneBook.find({})
    .then(phones => {
      res.send(`<p>Phonebook has info for ${phones.length} people</p><p>${new Date()}</p>`);
    });
});

app.delete('/api/persons/:id', (req, res) => {
  PhoneBook.findByIdAndRemove(req.params.id)
  .then(result => {
    res.status(204).end();
  })
  .catch(err => console.log(err));
});

app.put('/api/persons/:id', (req, res) => {
  PhoneBook.findOneAndUpdate({_id: req.params.id}, {number: req.body.number}, {new: true}, (err, updatedDoc) => {
    if(err) {
      return console.log(err);
    }
    res.json(updatedDoc);
});
});

app.post('/api/persons', (req, res) => {
  const person = req.body;

  if (!person.name || !person.number) {
    return res.status(400).json({
      error: 'The name or number is missing'
    });
  }

  let record = new PhoneBook({
    name: person.name,
    number: person.number
  });
  record.save((err, data) => {
    if(err) {
      return console.log(err);
    }
    res.json(data);
  })
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));