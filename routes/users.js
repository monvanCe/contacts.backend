var express = require('express');
var router = express.Router();
const User = require('../models/users');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const { token } = require('morgan');
const cors = require('cors');

router.post('/register', cors(), (req, res) => {
  const register = req.body;
  console.log(register);
  bycrypt.hash(register.password, 10).then((hash) => {
    const user = new User({
      ...register,
      password: hash,
    });

    const promise = user.save();

    promise
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  });
});

router.post('/login', cors(), (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) throw err;

    if (!user) {
      res.json({
        status: false,
        message: 'Autantication faild, user not found',
      });
    } else {
      bycrypt.compare(password, user.password).then((result) => {
        if (!result) {
          res.json({
            status: false,
            message: 'Autantication failed, wrong password',
          });
        } else {
          const userid = user._id;
          const payload = {
            userid,
          };
          const token = jwt.sign(payload, req.app.get('api_secret_key'), {
            expiresIn: 7200,
          });
          console.log({
            status: true,
            token,
          });
          res.send({
            status: true,
            token,
          });
        }
      });
    }
  });
});

router.post('/showcontacts', cors(), function (req, res) {
  console.log(req.body);
  let update = req.body;
  const userid = jwt_decode(update.token).userid;

  const promise = User.findById(userid);

  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post('/addcontact', cors(), (req, res) => {
  console.log(req.body);
  let update = req.body;
  const userid = jwt_decode(update.token).userid;

  const promise = User.findByIdAndUpdate(
    userid,
    {
      $push: { contacts: req.body.contact },
    },
    {
      new: true,
    }
  );

  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post('/updatecontact', cors(), (req, res) => {
  console.log(req.body);
  let update = req.body;
  let key = req.body.key;
  const userid = jwt_decode(update.token).userid;

  const updateContact = 'contacts.' + key;

  const promise = User.findByIdAndUpdate(
    userid,

    {
      $set: { [updateContact]: req.body.contact },
    },
    { new: true }
  );

  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post('/deletecontact', cors(), (req, res) => {
  console.log(req.body);
  let update = req.body;
  const key = req.body.key;
  const userid = jwt_decode(update.token).userid;

  const arrayName = 'contacts';
  const index = parseInt(key);

  const promise = User.findByIdAndUpdate(userid, [
    {
      $set: {
        [arrayName]: {
          $concatArrays: [
            {
              $slice: [`$${arrayName}`, index],
            },
            {
              $slice: [
                `$${arrayName}`,
                index + 1,
                {
                  $size: `$${arrayName}`,
                },
              ],
            },
          ],
        },
      },
    },
  ]);

  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
