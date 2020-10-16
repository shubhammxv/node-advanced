// async.js
const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

const start =  Date.now();

function makeRequest() {
  https
    .request('https://www.google.com', (res) => {
      res.on('data', () => {

      });
      res.on('end', () => {
        console.log("Response: ", Date.now() - start);
      })
    })
    .end();
};


// threads.js
function makeHash() {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log("Hash: ", Date.now() - start);
  })
}

makeRequest();

// fs module
fs.readFile('multitask.js', 'utf8', () => {
  console.log("File Read: ", Date.now() - start);
});

// Try running file again after commenting all code below;
// SEE SOME INTERESTING BEHAVIOUR
makeHash();
makeHash();
makeHash();
makeHash();
