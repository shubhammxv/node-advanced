
const redis = require('redis');

// Takes a function and wraps it like it returns back a promise
const { promisify } = require('util');

const redisURL = process.env.redisURL;
const redisClient = redis.createClient(redisURL);

redisClient.get = promisify(redisClient.get);
redisClient.hget = promisify(redisClient.hget);

module.exports = redisClient;
