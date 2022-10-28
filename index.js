const express = require('express');
const morgan = require('morgan');
const PhoneBook = require('./db');

const app = express();

app.use(express.static('assets'));
app.use(express.json());

morgan.token('body', function (req) { return JSON.stringify(req.body); });

app.use(morgan(':method :url :response-time :body'));


const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  next(err);
};

app.use(errorHandler);

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
    .then(() => {
      res.status(204).end();
    })
    .catch(err => console.log(err));
});

app.put('/api/persons/:id', (req, res) => {
  PhoneBook.findOneAndUpdate({_id: req.params.id}, {number: req.body.number}, 
    {
      new: true,
      runValidators: true, 
      context: 'query' 
    }, (err, updatedDoc) => {
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
  record.save()
    .then(data => res.json(data))
    .catch(err => console.log(err));
});

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));