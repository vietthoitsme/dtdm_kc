import mongoose, { get } from "mongoose";
const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    images: {
      type: Array,
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    comments: [{ type: mongoose.Types.ObjectId, ref: "comment" }],
    // comments: [
    //   {
    //     content: {
    //       type: String,
    //     },
    //     creator: { type: mongoose.Types.ObjectId, ref: "user" },
    //     likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    //     postId: mongoose.Types.ObjectId,
    //     createdAt: {
    //       type: Date,
    //       default: new Date(),
    //     },
    //   },
    // ],
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("post", postSchema);
