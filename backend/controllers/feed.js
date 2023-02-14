const { validationResult } = require("express-validator");
const Post = require("../modals/post");

exports.getPosts = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalItems;
  Post,
    find()
      .countDocuments()
      .then((count) => {
        totalItems = count;
        return Post.find()
          .skip((currentPage - 1) * perPage)
          .limit(perPage);
      })
      .then((posts) => {
        res.status(200).json({
          message: "Fetched products succesfully",
          posts: posts,
          totalItems: totalItems,
        });
      })
      .catch((err) => {
        if (err.statusCode) {
          err.statusCode = 500;
        }
      });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "validaition failed, entered data is incorrect",
      errors: errors.array(),
    });
  }
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    _id: new Date().toISOString(),
    title: title,
    content: content,
    creator: { name: "Korede" },
  });
  post
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Post created successfully!",
        post: {
          _id: new Date().toISOString(),
          creator: { name: "Korede" },
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
  res.status(201).json({
    message: "Post created successfully!",
    post: {
      _id: new Date().toISOString(),
      creator: { name: "Korede" },
    },
  });
};
