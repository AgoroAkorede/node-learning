const { validationResult } = require("express-validator/check");

const io = require("../socket");
const Post = require("../modals/post");
const User = require("../modals/user");

exports.getPosts = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalItems;
  try {
    const count = await Post.find().countDocuments();

    const posts = await Post.find()
      .populate("creator")
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      message: "Fetched products succesfully",
      posts: posts,
      totalItems: totalItems,
    });
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }

  // .catch((err) => {
  //   if (err.statusCode) {
  //     err.statusCode = 500;
  //   }
  //   next(err);
  // });
  //...
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
    imageUrl: imageUrl,
    creator: req.userId,
  });
  post.save();

  io.getIO
    .emit("posts", {
      action: "create",
      post: post,
    })
    .then((result) => {
      User.findById(req.userId);
    })
    .then((user) => {
      creator = user;
      user.posts.push(post);
    })
    .then((result) => {
      res.status(201).json({
        message: "Post created successfully!",
        post: post,
        creator: { _id: creator._id, name: creator.name },
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
    });
  res.status(201).json({
    message: "Post created successfully!",
    post: {
      _id: new Date().toISOString(),
      creator: { name: "Korede" },
    },
  });
};
