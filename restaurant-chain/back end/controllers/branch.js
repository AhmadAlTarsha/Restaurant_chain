const Branch = require("../models/branch");
const Menu = require("../models/menu");
const BranchMenu = require("../models/branch_menu");
const { throwError } = require("../middleware/throwError");

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

    if (result[0]?._options.raw) {
      return res.status(200).json({
        error: false,
        all_Branches: result,
      });
    } else if (result.length === 0) {
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


exports.getBranchById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await Branch.findByPk(id, {
      include: [
        {
          model: BranchMenu, attributes: ["menu_id"],
          include: [
            {
              model: Menu,
              attributes: ["id", "name", "active"],
              
            },
          ],
        },
      ],
    });

  
    if (!result) {
      return res.status(404).json({
        error: true,
        message: "Branch not found",
      });
    }
    const arr = result.Branches_Menus.map((item) => {
      return item.Menu.name;
    });

    console.log( "______________________________________",result[0]);
    return res.status(200).json({
      error: false,
        branch: result,

      menu: arr
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
    const { name, phone, street_name, } = req.body;
  
    try {
      const result = await Branch.update(
        { name, phone, street_name,  },
        { where: { id } }
      );
      if (typeof result[0] === "number") {
        return res.status(200).json({
          error: false,
          message: "Resturant Updated Successfully",
         
        });
      }
  
      return throwError(400, "Something went wrong");
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };