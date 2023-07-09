const router = require("express").Router();
const verifyTokens = require("../middleware/auth");
const Post = require("../models/Post");

//@route  GET  api/posts
//@desc GET post
//@access private
router.get("/", verifyTokens, async (req, res) => {
  try {
    const post = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    return res.json({ success: true, post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//@route  POST  api/posts
//@desc Create post
//@access private

router.post("/", verifyTokens, async (req, res) => {
  const { title, description, url, status } = req.body;

  //simple validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });

  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || "To Learn",
      user: req.userId,
    });
    await newPost.save();
    res.json({ success: true, message: "Happy Learning", post: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//@route  PUT  api/posts
//@desc Update post
//@access private
router.put("/:id", verifyTokens, async (req, res) => {
  const { title, description, url, status } = req.body;
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });

  try {
    let updatedPost = {
      title,
      description,
      url: (url.startsWith("https://") ? url : `https://${url}`) || "",
      status: status || "To Learn",
    };
    const postUpdateCondition = { _id: req.params.id, user: req.userId };
    updatedPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: true }
    );
    //User not authorized to update post or post not found
    if (!updatedPost)
      res.status(401).json({
        success: false,
        message: "Post not found or user not authorized",
      });
    //ok
    res.json({
      success: true,
      message: "Excellent progress!!",
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//@route  PUT  api/posts
//@desc Update post
//@access private
router.delete("/:id", verifyTokens, async (req, res) => {
  try {
    const postDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletePost = await Post.findOneAndDelete(postDeleteCondition);

    //User not authorized to update post or post not found
    if (!deletePost)
      res.status(401).json({
        success: false,
        message: "Post not found or user not authorized",
      });
    //ok
    res.json({
      success: true,
      message: "Delete success !",
      post: deletePost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
module.exports = router;
