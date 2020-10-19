
const Blog = require('../models/blog');

const redisClient = require('../config/redis');

exports.getBlogs = async (req, res, next) => {
  // Checking in redis if data is present already
  // Key is userId
  // data isn't returned immediately; need to use callback; doesn't support promises natively
  // const cachedBlogs = await redisClient.get(req.user.id);
  // if (cachedBlogs) {
  //   console.log("Serving from redis cache...");
  //   // Data is stored in stringified way in redis
  //   return res.send(JSON.parse(cachedBlogs));
  // }

  // If data not present in redis-cache
  console.log("Fetching and serving from db...");
  const blogs = await Blog.find({ _user: req.user.id });
  res.send(blogs);

  // Storing fetched data in redis for next time
  // redisClient.set(req.user.id, JSON.stringify(blogs));
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
}
