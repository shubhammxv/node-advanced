
const express = require('express');

const blogController = require('../controllers/blog');
const isAuth = require('../middlewares/isAuth');
const cleanCache = require('../middlewares/cleanCache');

const router = express.Router();

router.get(
  '/api/blogs',
  isAuth,
  blogController.getBlogs
);

router.get(
  '/api/blogs/:id',
  isAuth,
  blogController.getBlog
);

router.post(
  '/api/blogs',
  isAuth,
  cleanCache,
  blogController.postBlog
);

module.exports = router;
