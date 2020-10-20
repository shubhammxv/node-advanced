
const { clearHash } = require('../services/cache');

module.exports = async (req, res, next) => {
  // Here NEXT() refers to request handler route middleware
  // As we don't want to clear the cache until the new blog has been successfully created
  // So running this middleware only after request has been handled.
  await next();

  // After request handling
  clearHash(req.user.id);
}
