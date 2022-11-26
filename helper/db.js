const mongoose = require('mongoose');
const connectURL =
  'mongodb+srv://contacts:12345@cluster0.6hcf2uo.mongodb.net/local_library?retryWrites=true&w=majority';

module.exports = () => {
  mongoose
    .connect(connectURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('mongo db connection is succsesfuly');
    })
    .catch((err) => {
      console.log(err);
    });
};
