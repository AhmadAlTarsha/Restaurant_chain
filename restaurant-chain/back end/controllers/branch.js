const Branch = require("../models/branch");

exports.addBranch = async (req, res, next) => {
  const { name, phone, street_name } = req.body;

  try {
    const result = await Branch.findOrCreate({
      where: { name },
      defaults: {
        name,
        phone,
        street_name,
      },
    });

    if (!result[0]._options.isNewRecord) {
      return res.status(401).json({
        error: true,
        message: "Branch Already Exist",
      });
    }

    return res.status(200).json({
      error: false,
      message: "Branch Created Successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllBranches = async (req, res, next) => {
  try {
    const result = await Branch.findAll();
    console.log("====================================", result.length);
    if (result[0]?._options.raw) {
      return res.status(200).json({
        error: false,
        all_Branches: result,
      });
    }else if (result.length === 0) {
        return res.status(201).json({
          error: false,
          message: "no branch added yet",
        });
      }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
