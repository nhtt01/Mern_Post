const jwt = require("jsonwebtoken");
const verifyTokens = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    res.status(401).json({ status: false, message: "Access token not fond" });
  try {
    const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.userId;
  } catch (error) {
    console.log(error);
    res.status(403).json({ success: false, message: "Internal token error" });
  }
};
