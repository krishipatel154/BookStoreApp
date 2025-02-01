const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/user");

// signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;
    // check username length
    if (username.length < 3) {
      return res
        .status(400)
        .json({ message: "Username length should be more than 1!!" });
    }
    // check email unique or not
    const exisitingEmail = await User.findOne({ email });
    if (exisitingEmail) {
      return res.status(400).json({ message: "Email already exists!!" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password should be greater than 6" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      email: email,
      password: hashPassword,
      address: address,
    });
    await newUser.save();
    return res.status(200).json({ message: "Signup successfully!!" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
