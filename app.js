const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;
const Schema = mongoose.Schema;

mongoose.connect(
  'mongodb://localhost:27017/contacts',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('succesfully connected');
    }
  }
);

const contactsSchema = new Schema({
  email: { type: String },
  username: { type: String },
  password: { type: String },
  date: { type: Date, default: Date.now() },
  contacts: [],
});

const contactsModel = mongoose.model('Users', contactsSchema);

const user1 = new contactsModel({
  email: 'omerfkoca@gmail.com',
  username: 'monvance',
  password: 'omerofkoca74',
  contacts: [
    { name: 'beyazmasa', number: 153 },
    { name: 'ttmusteri', number: 4441444 },
  ],
});

const user2 = new contactsModel({
  email: 'falcao4247@gmail.com',
  username: 'ardoli599',
  password: 'ardoli1905',
  contacts: [
    { name: 'beyazmasa', number: 153 },
    { name: 'ttmusteri', number: 4441444 },
  ],
});

user1.save((err) => {
  if (err) {
    console.log('user 1 save başarısız');
    return handleError(err);
  } else {
    console.log('user 1 save başarılı');
  }
});

user2.save((err) => {
  if (err) {
    console.log('user 2 save başarısız');
    return handleError(err);
  } else {
    console.log('user 2 save başarılı');
  }
});
