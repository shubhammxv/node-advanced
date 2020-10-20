
const Blog = require('../models/blog');
const redisClient = require('../config/redis');
const { clearHash } = require('../services/cache');

exports.getBlogs = async (req, res, next) => {
  const blogs = await Blog
    .find({ _user: req.user.id })
    .cache({ key: req.user.id });   // Top level key in nested data for a single user
  res.send(blogs);
}

exports.getBlog = async (req, res, next) => {
  const blog = await Blog.findOne({
    _user: req.user.id,
    _id: req.params.id
  });

  res.send(blog);
}

exports.postBlog = async (req, res, next) => {
  const { title, content } = req.body;
  const blog = new Blog({
    title,
    content,
    _user: req.user.id
  });

  try {
    await blog.save();
    res.send(blog);
  } catch (err) {
    res.send(400, err);
  }
  // Handling in cleanCache middleware
  // clearHash(req.user.id);
}
