
// See mongoose source code
const mongoose = require('mongoose');

const redisClient = require('../config/redis');

const exec = mongoose.Query.prototype.exec;

// Hooking into mongoose query execution
// It creates query and calls .exec on query
// So Checking in redis if query is already called before executing query
mongoose.Query.prototype.exec = async function() {
  console.log("Running a query...", this.getQuery());   // Query being executed
  console.log("Collection running query...", this.mongooseCollection.name)    // Name of the Collection that called the query

  // Creation of unique REDIS_KEY
  const redisKey = JSON.stringify(Object.assign({}, this.query(), {
    collection: this.mongooseCollection.name
  }));

  // Checking if "redisKey" is already present in REDIS
  const cacheValue = await redisClient.get(redisKey);
  if (cacheValue) {
    // If present in REDIS, then return the cacheValue
    console.log("Returning cached value...");
    return JSON.parse(cacheValue);
  }

  // If cacheValue not present; execute query, store in redis and return queryResult
  console.log("Fetching and Returning from db...");
  const queryResult = await exec.apply(this, arguments);
  redisClient.set(redisKey, JSON.stringify(result));
  return queryResult;
}
