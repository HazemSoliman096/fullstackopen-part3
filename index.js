const express = require('express');
const app = express();

const data = require('./data');

app.get('/api/persons', (req, res) => res.json(data.Persons));

app.get('/info', (req, res) => res.send(data.info));

const PORT = 3001;

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));