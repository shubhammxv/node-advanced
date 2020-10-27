
const dbCredentials = `${process.env.mongoUser}:${process.env.mongoPassword}`;

module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: `mongodb://127.0.0.1:27017/blogs_ci?retryWrites=true&w=majority`,
  cookieKey: '123123123',
  redisURL: 'redis://127.0.0.1:6379',
  s3AccessKey: '',
  s3SecretKey: ''
};
