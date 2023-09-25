import Posts from "../model/posts.js";
import User from "../model/user.js";
import mongoose from "mongoose";
export const getPosts = async (req, res) => {
  try {
    const posts = await Posts.find()
      .sort("-createdAt")
      .populate("creator")
      // .populate("comments.creator");
      .populate({
        path: "comments",
        populate: {
          path: "creator",
        },
      });

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const user = await User.findById(post.creator);
  const newPost = new Posts({
    ...post,
    creator: user,
    createdAt: new Date().toISOString(),
  });
  // const userPost = new User({
  //   ...user,
  //   posts: [...user.posts, newPost],
  //   // posts: user.posts.push(newPost),
  // });
  // await userPost.save();
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    // try {
    //   const newPost = new Posts({
    //     ...post,
    //     creator: req.userId,
    //     createdAt: new Date().toISOString(),
    //   });
    //   await newPost.save();
    //   res.status(201).json(newPost);
    // }
    res.status(500).json({ message: err.message });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  const post = await Posts.findById(id).populate("creator");
  try {
    if (!post.likes.includes(req.userId)) {
      const update = await Posts.findByIdAndUpdate(
        id,
        { $push: { likes: req.userId } },
        { new: true }
      )
        .populate("creator")
        .populate({
          path: "comments",
          populate: {
            path: "creator",
          },
        });

      // const newPost = {
      //   ...post,
      //   likes: update.likes,
      // };
      // res.status(200).json(newPost._doc);
      // res.status(200).json(update);
      // res.status(200).json({
      //   ...post._doc,
      //   likes: update.likes,
      // });
      res.status(200).json(update);
    } else {
      const update = await Posts.findByIdAndUpdate(
        id,
        { $pull: { likes: req.userId } },
        { new: true }
      )
        .populate("creator")
        .populate({
          path: "comments",
          populate: {
            path: "creator",
          },
        });
      // const newPost = {
      //   ...post,
      //   likes: update.likes,
      // };
      // res.status(200).json(newPost._doc);
      // res.status(200).json(update);
      // res.status(200).json({
      //   ...post._doc,
      //   likes: update.likes,
      // });
      res.status(200).json(update);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllUserLikePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Posts.findById(id).populate("creator");
    const users = await User.find({ _id: { $in: post.likes } }).limit(5);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const newPost = await Posts.findByIdAndDelete(id);
    res.status(200).json("Post deleted successfully");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPostByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Posts.find({ creator: id })
      .sort("-createdAt")
      .populate("creator")
      .populate({
        path: "comments",
        populate: {
          path: "creator",
        },
      });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
