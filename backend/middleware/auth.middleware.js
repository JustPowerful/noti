const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "There was a problem verifying the user's token.",
      });
    } else {
      req.userId = decoded.id;
      req.userEmail = decoded.email;
      next();
    }
  });
};
