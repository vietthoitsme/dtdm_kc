import Comment from "../model/comment.js";
import Posts from "../model/posts.js";
import User from "../model/user.js";
import Reply from "../model/reply.js";
export const createComment = async (req, res) => {
  const { id } = req.params;
  // const { content, tag, rely } = req.body;
  const comment = req.body;
  try {
    const post = await Posts.findById(id).populate("creator");
    const user = await User.findById(req.userId);
    // const newComment = {
    //   ...post,
    //   comments: post.comments.push({
    //     content: comment.content,
    //     creator: user,
    //     postId: id,
    //     createdAt: new Date().toISOString(),
    //   }),
    // };
    const newComment = new Comment({
      ...comment,
      creator: user,
      postId: id,
    });
    // console.log(newComment);
    await newComment.save();
    const newPost = {
      ...post,
      comments: post.comments.push(newComment),
    };
    const result = await Posts.findByIdAndUpdate(id, newPost._doc, {
      new: true,
    })
      .populate("creator")
      .populate({
        path: "comments",
        populate: {
          path: "creator",
        },
      });
    // .populate({
    //   path: "reply",
    //   populate: {
    //     path: "creator",
    //   },
    // });

    // console.log(result);
    res.status(201).json(result);
    // const update = await Posts.findByIdAndUpdate(
    //   id,
    //   { $push: { comments: newComment } },
    //   { new: true }
    // )
    //   .populate("creator")
    //   .populate("comments.creator");

    // const newPost = {
    //   ...post,
    //   comments: [...post.comments, newComment],
    // };
    // res.status(200).json(newPost._doc);

    // console.log(newComment);
    // const result = await Posts.findByIdAndUpdate(id, newComment, { new: true })
    //   .populate("creator")
    //   .populate("comments.creator");
    // res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const likeComment = async (req, res) => {
  const { id } = req.params; // id comment
  try {
    const comment = await Comment.findById(id);
    if (!comment.likes.includes(req.userId)) {
      const update = await Comment.findByIdAndUpdate(
        id,
        { $push: { likes: req.userId } },
        { new: true }
      );
      res.status(200).json(update);
    } else {
      const update = await Comment.findByIdAndUpdate(
        id,
        { $pull: { likes: req.userId } },
        { new: true }
      );
      res.status(200).json(update);
    }
    // find by id comment
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const replyComment = async (req, res) => {
  const { id } = req.params;
  const reply = req.body;
  console.log(reply);
  console.log(id);
  try {
    // const post = await Posts.findById(id);
    // const replyComment = new Comment({
    //   ...reply,
    //   creator: req.userId,
    // });
    // await replyComment.save();
    // const newPost = {
    //   ...post,
    //   comments: post.comments.push(replyComment),
    // };
    // const result = await Posts.findByIdAndUpdate(id, newPost._doc, {
    //   new: true,
    // })
    //   .populate("creator")
    //   .populate({
    //     path: "comments",
    //     populate: {
    //       path: "creator",
    //     },
    //   });
    // res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
