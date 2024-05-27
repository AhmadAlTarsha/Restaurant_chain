const Branch = require("../models/branch");
const Menu = require("../models/menu");
const BranchOpeningHours = require("../models/branch_opening_hours");
const { throwError } = require("../middleware/throwError");

exports.addBranchOpeningHours = async (req, res, next) => {
  // const branchMenus = req.body; // Assuming req.body is an array of objects

  try {
    const result = await BranchOpeningHours.bulkCreate(
      [
        {
          day: "sat",
          start_time: "10 Am",
          end_time: "10 pm",
          branch_id: 1,
        },
        {
          day: "sun",
          start_time: "10 Am",
          end_time: "10 pm",
          branch_id: 1,
        },
        {
          day: "mon",
          start_time: "10 Am",
          end_time: "10 pm",
          branch_id: 1,
        },
        {
          day: "thi",
          start_time: "10 Am",
          end_time: "10 pm",
          branch_id: 1,
        },
        {
          day: "wed",
          start_time: "10 Am",
          end_time: "10 pm",
          branch_id: 1,
        },
        {
          day: "thu",
          start_time: "10 Am",
          end_time: "10 pm",
          branch_id: 1,
        },
        {
          day: "fri",
          start_time: "10 Am",
          end_time: "10 pm",
          branch_id: 1,
        },
        {
          day: "sat",
          start_time: "10 Am",
          end_time: "10 pm",
          branch_id: 2,
        },
        {
          day: "sun",
          start_time: "10 Am",
          end_time: "10 pm",
          branch_id: 2,
        },
        {
          day: "mon",
          start_time: "10 Am",
          end_time: "10 pm",
          branch_id: 2,
        },
        {
          day: "thi",
          start_time: "10 Am",
          end_time: "10 pm",
          branch_id: 2,
        },
        {
          day: "wed",
          start_time: "10 Am",
          end_time: "10 pm",
          branch_id: 2,
        },
        {
          day: "thu",
          start_time: "10 Am",
          end_time: "10 pm",
          branch_id: 2,
        },
        {
          day: "fri",
          start_time: "10 Am",
          end_time: "10 pm",
          branch_id: 2,
        },
      ],
      {
        ignoreDuplicates: true, // This will ignore duplicate entries based on unique constraints
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
