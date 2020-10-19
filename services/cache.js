
// See mongoose source code
const mongoose = require('mongoose');

const redisClient = require('../config/redis');

const exec = mongoose.Query.prototype.exec;

// Instead of caching all queries; caching only queries having .cache() function chained
// So adding function to Query prototype; makes accesible to all queries
mongoose.Query.prototype.cache = function() {
  // this points to Query instance; every instance has its own this
  this._cacheQuery = true;

  // Makes chainable to any other function at any point;
  // As the instance is returned the same as from any other function
  return this;
}

// Hooking into mongoose query execution
// It creates query and calls .exec on query
// So Checking in redis if query is already called before executing query
mongoose.Query.prototype.exec = async function() {
  console.log("Running a query...", this.getQuery());   // Query being executed
  console.log("Collection running query...", this.mongooseCollection.name)    // Name of the Collection that called the query

  if (!this._cacheQuery) {
    return exec.apply(this, arguments);
  }
  // Creation of unique REDIS_KEY
  const redisKey = JSON.stringify(Object.assign({}, this.query(), {
    collection: this.mongooseCollection.name
  }));

  // Checking if "redisKey" is already present in REDIS
  const cacheValue = await redisClient.get(redisKey);
  if (cacheValue) {
    // If present in REDIS, then return the cacheValue
    console.log("Returning cached value...");
    // Return value should be instance of Mongo Documents; not JS objects
    // Also there can be array of Documents
    const cacheData = JSON.parse(cacheValue);
    const mongoDocs = Array.isArray(cacheData)
      ? cacheData.map(doc => new this.model(doc))
      : new this.model(cacheData)

    return mongoDocs;
  }

  // If cacheValue not present; execute query, store in redis and return queryResult
  console.log("Fetching and Returning from db...");
  const queryResult = await exec.apply(this, arguments);
  
  // 'EX' to set expiration time in seconds as 4th arg
  redisClient.set(redisKey, JSON.stringify(result), 'EX', 3600);
  return queryResult;
}
