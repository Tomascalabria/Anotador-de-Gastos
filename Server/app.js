const express = require('express');
const app = express();
require('dotenv').config();
const auth = require('./Src/Middlewares/auth')
const bodyParser = require('body-parser');
const users = require('./Src/routes/users');
const expenses = require('./Src/routes/Expenses');
const friends = require('./Src/routes/friends');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors({ origin: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to the MongoDB database');
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/auth', auth);
app.use('/users', users);
app.use('/expenses', expenses);
app.use('/friends', friends);

const port = process.env.PORT || 5050;
const host = '0.0.0.0';

app.listen(port, host, () => {
  console.log('API is running on port ' + port);
});
