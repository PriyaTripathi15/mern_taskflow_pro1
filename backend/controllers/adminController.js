import User from "../models/User.js";

export const getUsers = async (req, res) => {
  const users = await User.find().select("name email role createdAt").sort({ createdAt: -1 });
  res.json(users.map((user) => ({ ...user.toObject(), taskCount: 0 })));
};

export const updateUser = async (req, res) => {
  const { role } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true })
    .select("name email role createdAt");
  res.json(user);
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};