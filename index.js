// Limiting no of threapools
// Total remains same; each child gets one
process.env.UV_THREADPOOL_SIZE = 1;

const cluster = require('cluster');

// Is the file being executed in master mode
if (cluster.isMaster) {
  // cause *index.js* to be executed again but in child mode
  // Every fork creates one instance
  // One fork starts up one child; anytime server is started
  // Every single child has their own thread pool
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();

} else {
  // I'm a child
  // I'm going to act like a server and nothing else
  const express = require('express');
  const crypto = require('crypto');

  const app = express();

  // Pauses for exact amount of time always;
  // Using other function to simulate real world; i.e. takes diff time to complete when executed
  // function doWork(duration) {
  //   const start = Date.now();
  //   while(Date.now() - start < duration) {
  //     // do some stuff
  //   }
  // }

  app.get('/', (req, res, next) => {
    // doWork(5000);
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
      res.send("Hey there!!");
    })
  })

  app.get('/fast', (req, res, next) => {
    res.send("Hey there! This is faster.");
  })

  app.listen(3000);
}
