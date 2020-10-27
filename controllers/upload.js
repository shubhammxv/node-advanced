
const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const keys = require('../config/keys');

const s3 = new AWS.S3({
  accessKeyId: keys.s3AccessKey,
  secretAccessKey: keys.s3SecretKey
})

exports.uploadBlogImage = (req, res, next) => {
  const key = `${req.user.id}/${uuid()}.jpeg`;

  s3.getSignedUrl('putObject', {
    Bucket: 'blogs-bucket-135',
    Key: key,
    ContentType: 'jpeg'
  }, (err, url) => {
    if (err) {
      return res.send({ err, status: 500 });
    }
    res.send({ key, url });
  })
}
