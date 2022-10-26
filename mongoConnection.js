const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const user = process.env.USER;
const pwd = process.argv[2];
const db = process.env.DB;
const host = process.env.HOST;
const port = process.env.PORT;

//const URL = `mongosh://${user}:${pwd}@${host}:${port}/${db}`;

const URL = `mongodb://${user}:${pwd}@${host}:${port}/?authMechanism=DEFAULT&authSource=${db}`;

console.log(URL);

const connect = async () => {
  await mongoose.connect(URL);
}

const save = async (record) => {
  await record.save()
}

const close = async () => {
  await mongoose.connection.close();
}

const find = async (model) => {
  await model.find({});
}

const PhoneBookSchema = new mongoose.Schema({
  name: String,
  number: Number
});

const PhoneBook = mongoose.model('PhoneBook', PhoneBookSchema);

connect()
  .then(console.log("connected"))
  .catch(err => console.log(err));

if (process.argv.length > 3) {
  const Person = new PhoneBook({
    name: process.argv[3],
    number: process.argv[4]
  });

  save(Person);
  close();
}

if (process.argv.length < 4) {
  console.log('PhoneBook: ');
  find(PhoneBook)
    .then(result => {
      Persons.forEach(p => console.log(`${p.name} ${p.number}`));
      close();
    })
    .catch(err => {
      console.log(err);
      close();
    })
}