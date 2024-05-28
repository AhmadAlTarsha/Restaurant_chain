const Branch = require("../models/branch");
const Menu = require("../models/menu");
const BranchOpeningHours = require("../models/branch_opening_hours");
const { throwError } = require("../middleware/throwError");

exports.addBranchOpeningHours = async (req, res, next) => {
  
  const branchesOpening = req.body;
  try {
    const result = await BranchOpeningHours.bulkCreate(
      branchesOpening,

      {
        ignoreDuplicates: true, 
      }
    );
    console.log(res);
    return res.status(200).json({
      error: false,
      message: "Branch_opining Created Successfully",
      createdBranchMenus: result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.editBranch = async (req, res, next) => {
  const { id } = req.params;
  const { start_time } = req.body;

  try {
    const result = await BranchOpeningHours.update(
      { start_time },
      { where: { id } }
    );

    if (result[0] === 0) {
      return res.status(404).json({
        error: true,
        message: "branch not found or no changes made",
      });
    }

    return res.status(200).json({
      error: false,
      message: "branch opining hour updated successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
