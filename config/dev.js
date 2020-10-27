
const dbCredentials = `${process.env.mongoUser}:${process.env.mongoPassword}`;

module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: `mongodb://${dbCredentials}@cluster0.bdbz0.mongodb.net/blogs?retryWrites=true&w=majority`,
  cookieKey: '123123123',
  redisURL: 'redis://127.0.0.1:6379',
  s3AccessKey: process.env.S3_ACCESS_KEY,
  s3SecretKey: process.env.S3_SECRET_KEY
};
