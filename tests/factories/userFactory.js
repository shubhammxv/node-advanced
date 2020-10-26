
// Jest creates a new node environment and we won't have access to this model
// As the file index.js is not executed by "npm run test"
// So no DB connection and no access to create User
const User = require('../../models/user');

module.exports = () => {
  return new User({

  }).save();
}
