const { Error } = require("./throwError");
const path = require("path");
const fs = require("fs");

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);

  fs.unlink(filePath, (err) => {
    console.log(err);
  });
};
exports.authorization = (string) => {
  return (req, res, next) => {
    let image;
    if (req.file) {
      image = req.file.path.replace("\\", "/");
    }

    console.log(req.token.user);
    if (!req.token.user.Permission.includes(string)) {
      clearImage(image);
      return res.status(403).json({
        success: false,
        message: `Unauthorized !`,
      });
    }
    next();
  };
};
