
const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
  res.send("Hey there!!");
})

app.listen(3000);
