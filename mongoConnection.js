const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const user = process.env.USER;
const pwd = process.argv[2];
const db = process.env.DB;
const host = process.env.HOST;
const port = process.env.PORT;

//const URL = `mongosh://${user}:${pwd}@${host}:${port}/${db}`;

//const URL = `mongodb://${user}:${pwd}@${host}:${port}/?authMechanism=DEFAULT&authSource=${db}`;

const URL= `mongodb+srv://${user}:${pwd}@fullstack.8v9soea.mongodb.net/${db}?retryWrites=true&w=majority`

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const PhoneBookSchema = new mongoose.Schema({
  name: String,
  number: Number
});

const PhoneBook = mongoose.model('PhoneBook', PhoneBookSchema);

mongoose.connect(URL).catch(err => console.log(err));

if (process.argv.length > 3) {
  console.log(process.argv)
  const Person = new PhoneBook({
    name: process.argv[3],
    number: process.argv[4]
  });
  console.log(Person)
  Person.save().then(p => {
    console.log('saved')
    mongoose.connection.close();
  });
}

if (process.argv.length < 4) {
  console.log('PhoneBook: ');
  PhoneBook.find({})
    .then(record => {
      record.forEach(p => console.log(`${p.name} ${p.number}`));
      mongoose.connection.close();
    })
    .catch(err => {
      console.log(err);
      mongoose.connection.close();
    })
}