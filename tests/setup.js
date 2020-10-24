require('dotenv').config();

const mongoose = require('mongoose');
const User = require('../models/user');

const dbCredentials = `${process.env.mongoUser}:${process.env.mongoPassword}`;
const dbUri = `mongodb+srv://${dbCredentials}@cluster0.bdbz0.mongodb.net/blogs?retryWrites=true&w=majority`;

mongoose.connect(
  dbUri,
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(res => {

}).catch(err => {
  
})
