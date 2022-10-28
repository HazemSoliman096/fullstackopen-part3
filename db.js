const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const user = process.env.USER;
const pwd = process.env.PASS;
const db = process.env.DB;

const URL= `mongodb+srv://${user}:${pwd}@fullstack.8v9soea.mongodb.net/${db}?retryWrites=true&w=majority`


mongoose.connect(URL).catch(err => console.log(err));

const PhoneBookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
  }}}
});

PhoneBookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
});

module.exports = mongoose.model('PhoneBook', PhoneBookSchema);