const mongoose = require('mongoose');

const user = process.env.USER;
const pwd = process.env.PWD;
const db = process.env.DB;

const URL = `mongodb://${user}:${pwd}@localhost:27017/${db}`

const connect = async () => {
  await mongoose.connect(URL);
}