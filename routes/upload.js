
const express = require('express');

const isAuth = require('../middlewares/isAuth');
const uploadController = require('../controllers/upload');

const router = express.Router();

router.get(
  '/api/upload/blog_image',
  isAuth,
  uploadController.uploadBlogImage
)


module.exports = router;
