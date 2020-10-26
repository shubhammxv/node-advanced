
const { Buffer } = require('safe-buffer');
const Keygrip = require('keygrip');
const keys = require('../../config/keys');

const keygrip = new Keygrip([keys.cookieKey]);

module.exports = (user) => {
  // User ID existing in DB to create fake session for testing
  // const userId = process.env.USER_ID;
  const sessionObj = {
    passport: {
      id: user._id.toString()
    }
  };

  const sessionString = Buffer.from(
    JSON.stringify(sessionObj)
  ).toString('base64');

  // Signing the session to check for tampering
  const sessionSign = keygrip.sign(`session=${sessionObj}`);

  return {
    sessionString,
    sessionSign
  }
};
