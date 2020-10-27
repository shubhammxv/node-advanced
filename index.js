require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blog');
const uploadRoutes = require('./routes/upload');

require('./services/passport');
require('./services/cache');

const dbCredentials = `${process.env.mongoUser}:${process.env.mongoPassword}`;
const dbUri = `mongodb+srv://${dbCredentials}@cluster0.bdbz0.mongodb.net/blogs?retryWrites=true&w=majority`;

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);
app.use(blogRoutes);
app.use(uploadRoutes);

if (['production', 'ci'].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}

mongoose.connect(
  dbUri,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(result => {
    const port = process.env.PORT || 5000;
    app.listen(port);
    console.log(`MongoDB Connected. Server listening on Port ${port}`);
  })
  .catch(err => {
    console.log("Err connecting MongoDB", err);
  })
