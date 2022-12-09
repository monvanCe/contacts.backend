const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  id: Schema.Types.ObjectId,
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  contacts: { type: Array },
});

module.exports = mongoose.model('Users', usersSchema);
