// Runs on a separate thread than app
// Can run most of the blocking code

const express = require('express');
const Worker = require('webworker-threads').Worker;

const app = express();

app.get('/', (req, res, next) => {

  // App side worker interface
  const worker = new Worker(function() {
    // Can't access variables in here using closure scopes
    // Worker running on separate thread
    this.onmessage = function() {
      let counter = 0;
      while(counter < 1e9) {
        counter++;
      }

      postMessage(counter);
    }
  });

  // Invoked by above postMessage(counter)
  worker.onmessage = function(message) {
    console.log("Message", message.data);
    res.send(`${message.data}`);
  }

  worker.postMessage();   // Invokes above this.onmessage function
})

app.get('/fast', (req, res, next) => {
  res.send("Hey there! This is faster.");
})

app.listen(3000);
