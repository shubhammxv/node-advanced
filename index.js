// Limiting no of threapools
// Total remains same; each child gets one
process.env.UV_THREADPOOL_SIZE = 1;

const express = require('express');
const crypto = require('crypto');

const app = express();

app.get('/', (req, res, next) => {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    res.send("Hey there!!");
  })
})

app.get('/fast', (req, res, next) => {
  res.send("Hey there! This is faster.");
})

app.listen(3000);
