
const dbCredentials = `${process.env.mongoUser}:${process.env.mongoPassword}`;

module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: `mongodb://${dbCredentials}@cluster0.bdbz0.mongodb.net/blogs?retryWrites=true&w=majority`,
  cookieKey: '123123123',
};
