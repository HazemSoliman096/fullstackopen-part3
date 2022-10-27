const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const user = process.env.USER;
const pwd = process.env.PASS;
const db = process.env.DB;

const URL= `mongodb+srv://${user}:${pwd}@fullstack.8v9soea.mongodb.net/${db}?retryWrites=true&w=majority`

const PhoneBookSchema = new mongoose.Schema({
  name: String,
  number: Number
});

const PhoneBook = mongoose.model('PhoneBook', PhoneBookSchema);

mongoose.connect(URL).catch(err => console.log(err));

PhoneBookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
});

module.exports = PhoneBook;