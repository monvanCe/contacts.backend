var async = require('async');
var Users = require('./models/users');

var mongoose = require('mongoose');
const mongoDB =
  'mongodb+srv://contacts:12345@cluster0.6hcf2uo.mongodb.net/local_library?retryWrites=true&w=majority';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = [];

function userCreate(email, username, password, contacts, cb) {
  userdetail = {
    email: email,
    username: username,
    password: password,
    contacts: contacts,
  };

  var user = new Users(userdetail);
  user.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New User: ' + user);
    users.push(user);
    cb(null, user);
  });
}

function createUsers(cb) {
  async.parallel(
    [
      function (callback) {
        userCreate(
          'omerfkoca@gmail.com',
          'monvance',
          'omerofkoca74',
          [
            { name: 'beyazmasa', number: 153 },
            { name: 'ttmusteri', number: 4441444 },
          ],
          callback
        );
      },
      function (callback) {
        userCreate(
          'falcao4242@gmail.com',
          'ardoli599',
          'ardoli1905',
          [
            { name: 'beyazmasa', number: 153 },
            { name: 'ttmusteri', number: 4441444 },
          ],
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createUsers],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('users: ' + users);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
