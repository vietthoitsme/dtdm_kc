import User from "../model/user.js";
const test = "test";

export const searchUsers = async (req, res) => {
  const { fullName } = req.query;
  try {
    // const fullName = new RegExp(search, "i");
    // const users = await User.find({ fullName });
    // search user have fullName contain search
    // const users = await User.find({
    //   fullName: { $regex: `${fullName}`, $options: "i" },
    // });
    // const users = await User.find({ fullName: { $regex: fullName, $options: "i" } });
    const users = await User.find({
      fullName: { $regex: req.query.fullName, $options: "i" },
    })
      .select("fullName avatar")
      .limit(5);
    // const users = await User.find({
    //   fullName: { $regex: req.query.fullName, $options: "i" },
    // })
    //   .find({ _id: { $ne: req.userId } })
    //   .select("fullName avatar")
    //   .limit(5);

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const editUser = async (req, res) => {
  const { avatar, fullName, mobile, address, story, website } = req.body;
  const { id } = req.params;
  try {
    const newUser = await User.findByIdAndUpdate(
      id,
      { avatar, fullName, mobile, address, story, website },
      { new: true }
    );
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// export const follow = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findById(id);
//     if (!user.followers.includes(req.userId)) {
//       await user.updateOne({ $push: { followers: req.userId } });
//       await user.save();
//       res.status(200).json("user has been followed");
//     } else {
//       await user.updateOne({ $pull: { followers: req.userId } });
//       await user.save();
//       res.status(200).json("user has been unfollowed");
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export const follow = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id); // phamminhthai
    if (!user.followers.includes(req.userId)) {
      const newUser = await User.findByIdAndUpdate(
        id,
        {
          $push: { followers: req.userId },
          // $push: { following: req.userId }
        },

        { new: true }
      );
      res.status(200).json(newUser);
    } else {
      const newUser = await User.findByIdAndUpdate(
        id,
        { $pull: { followers: req.userId } },
        { new: true }
      );
      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// };

export const getAllUser = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await User.find({ _id: { $ne: id } })
      .select("-password")
      .limit(5);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
