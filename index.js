import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import auth from "./router/auth.js";
import user from "./router/user.js";
import post from "./router/posts.js";
import comment from "./router/comment.js";

const app = express();
const port = 5000;

const URL =
  "mongodb+srv://nvtho20it1:subenbulen123@cluster0.2byauqf.mongodb.net/?retryWrites=true&w=majority"

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(express.json());
app.use(cors());

app.use("/auth", auth);
app.use("/auth", user);
app.use("/post", post);
app.use("/comment", comment);
mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => console.log(`Server running on port: ${port}`));
  })
  .catch((error) => console.log(error.message));
