const User = require("../models/user");

const registerUser = async (req, res) => {
  try {
      const user = new User(req.body);
      await user.save();
      res.status(201).json(user);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
}

const getUsers = async (req, res) => {
  try {
      const users = await User.find();
      res.json(users);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

module.exports = { registerUser, getUsers };
