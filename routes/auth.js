const passport = require('passport');
const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  authController.getGoogleAuthCallback
);

router.get(
  '/api/current_user',
  authController.getCurrUser
);

router.get(
  '/auth/logout',
  authController.getLogout
);

module.exports = router;
