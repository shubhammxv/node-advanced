
const https = require('https');

const start =  Date.now();

function makeRequest() {
  https
    .request('https://www.google.com', (res) => {
      res.on('data', () => {

      });
      res.on('end', () => {
        console.log(Date.now() - start);
      })
    })
    .end();
};

// Check time diff for one req and then check for all below running simultaneously
// Result is very different from threads.js => libuv

// Here libuv delegates these low-level operations to OS; OS makes http request
// libuv issues request and waits for OS to emit signal when response comes back
// No blocking as everything is done by OS here; ran entirely outside the event loop

makeRequest();
makeRequest();
makeRequest();
makeRequest();
makeRequest();
makeRequest();
makeRequest();
makeRequest();
