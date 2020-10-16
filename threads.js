// TRY WITH 2 fns, 4fns and 5fns and change UV_THREADPOOL_SIZE below (4 default);
// TRY INCREASING UV_THREADPOOL_SIZE form 4 to 5 also

// process.env.UV_THREADPOOL_SIZE = 2;
// process.env.UV_THREADPOOL_SIZE = 5;

const crypto = require('crypto');

const start = Date.now();

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log("1: ", Date.now() - start);
})

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log("2: ", Date.now() - start);
})

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log("3: ", Date.now() - start);
})

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log("4: ", Date.now() - start);
})

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log("5: ", Date.now() - start);
})
