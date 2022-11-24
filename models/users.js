const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  email: { type: String },
  username: { type: String },
  password: { type: String },
  date: { type: Date, default: Date.now() },
  contacts: [],
});

module.exports = mongoose.model('Users', usersSchema);