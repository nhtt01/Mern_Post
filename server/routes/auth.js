const express = require("express");
const router = require("express").Router();
const argon2 = require("argon2");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const verifyTokens = require("../middleware/auth");

//@route GET api/auth
// @desc check if user is logged in
// @access Public
router.post('/',verifyTokens,async(req,res)=>{
  try {
    const user = await User.findById(req.userId).select('-password');
    if(!user) return res.status(400).json({success:false,message:'User not found'});
    res.json({success:true,user});
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
})



//@route POST api/auth/register
// @desc Register User
// @access Public
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing username or password" });
  }
  try {
    // Check for existing user

    const user = await User.findOne({ username });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "User already taken" });
    // All good
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    //  return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: "User created successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//@route POST api/auth/Login
// @desc Login User
// @access Public
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing username or password" });
  }
  try {
    const user = await User.findOne({ username });
    //   username found
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username" });

    //All good
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    //return Token
    const accessToken = ({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);

    res.json({
      success: true,
      message: "User login in successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
module.exports = router;
