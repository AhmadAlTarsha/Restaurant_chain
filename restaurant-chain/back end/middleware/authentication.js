const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);

  fs.unlink(filePath, (err) => {
    console.log(err);
  });
};
exports.authentication = (req, res, next) => {
  let image;
  if (req.file) {
    image = req.file.path.replace("\\", "/");
  }

  try {
    if (!req.headers.authorization){ 
      clearImage(image);
      res.status(403).json({ message: "forbidden !" });}
     

    const token = req.headers.authorization.split(" ").pop();

    jwt.verify(token, process.env.SECRET, (err, result) => {
      if (err) {
        res.status(403).json({
          success: false,
          message: `The token is invalid or expired`,
        });
      } else {
        req.token = result;
        next();
      }
    });
  } catch (error) {
    clearImage(image);
    res.status(403).json({ message: "forbidden" });
  }
};
