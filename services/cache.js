
// See mongoose source code
const mongoose = require('mongoose');

const exec = mongoose.Query.prototype.exec;

// Hooking into mongoose query execution
// It creates query and calls .exec on query
// So Checking in redis if query is already called before executing query
mongoose.Query.prototype.exec = function() {
  console.log("Running a query...");
  return exec.apply(this, arguments);
}
