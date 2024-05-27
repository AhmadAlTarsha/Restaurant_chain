const BranchMenu = require("../models/branch_menu");



exports.addBranchMenu = async (req, res, next) => {
  const branchMenus = req.body; // Assuming req.body is an array of objects

  try {
      const result = await BranchMenu.bulkCreate(branchMenus, {
          ignoreDuplicates: true // This will ignore duplicate entries based on unique constraints
      });

      return res.status(200).json({
          error: false,
          message: "Branch_menus Created Successfully",
          createdBranchMenus: result
      });
  } catch (err) {
      if (!err.statusCode) {
          err.statusCode = 500;
      }
      next(err);
  }
};
exports.deleteMenuFormBranch = async (req, res) => {
    const { id } = req.params;
    const { menu_id } = req.body;
    try {
      const result = await BranchMenu.update(
        {
          active: 0,
        },
        { where: { branch_id: id ,menu_id:menu_id} }
      );
      if (result) {
          return res.status(200).json({
            error: false,
            message: "branch deleted successfully",
          });
        }
      console.log(result);
    } catch (err) {
      return res.status(500).json({
        error: true,
        message: "Error ",
        error: err,
      });
    }
  };
  