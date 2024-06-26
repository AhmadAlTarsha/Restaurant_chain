const Branch = require("../models/branch");
const Menu = require("../models/menu");
const BranchMenu = require("../models/branch_menu");
const BranchOpeningHours = require("../models/branch_opening_hours");
const branchMaintenance = require("../models/branch_maintenance");
const Maintenance = require("../models/maintenance");
const { throwError } = require("../middleware/throwError");
const { Op } = require("sequelize");

exports.addBranch = async (req, res, next) => {
  const { name, phone, street_name } = req.body;

  try {
    const [branch, created] = await Branch.findOrCreate({
      where: { name, active: 1 },
      defaults: {
        name,
        phone,
        street_name,
        active: 1,
      },
    });

    if (!created) {
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
    const result = await Branch.findAll({
      where: { active: 1 },
      include: [
        {
          model: BranchMenu,
          attributes: ["menu_id"],

          include: [
            {
              model: Menu,
              attributes: ["id", "name", "active"],
              where: { active: 1 },
            },
          ],
        },
        {
          model: branchMaintenance,
          attributes: [
            "id",
            "price",
            "maintenance_id",
            "from_date",
            "to_date",
            "comment",
          ],
          include: [
            {
              model: Maintenance,
              attributes: ["name"],
           
            },
          ],
        },
        {
          model: BranchOpeningHours,
          attributes: ["id", "open", "close", "day"],
        },
      ],
    });

    if (result[0]?._options.raw) {
      const allBranches = result.map((branch) => {
        return {
          id: branch.id,
          name: branch.name,
          phone: branch.phone,
          street_name: branch.street_name,
          active: branch.active,
          created_at: branch.created_at,
          Branch_Menu: branch.Branches_Menus.map((item) => {
            return item.Menu.name;
          }),
          branchOpining: branch.branches_opening_hours,
          BranchesMaintenances: branch.Branches_Maintenances,
        };
      });
      return res.status(200).json({
        error: false,
        branch: allBranches,
      });
    } else if (result.length === 0) {
      return res.status(201).json({
        error: false,
        message: "no branch added yet",
        branch: [],
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
          model: BranchMenu,
          attributes: ["menu_id"],

          include: [
            {
              model: Menu,
              attributes: ["id", "name", "active"],
              where: { active: 1 },
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

    const menuNames = result.Branches_Menus.map((item) => item.Menu.name);

    return res.status(200).json({
      error: false,
      branch: {
        id: result.id,
        name: result.name,
        phone: result.phone,
        street_name: result.street_name,
        active: result.active,
        created_at: result.created_at,
        Branches_Menus: {
          menu: menuNames,
        },
      },
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
  const { name, phone, street_name } = req.body;

  try {
    const existingBranch = await Branch.findOne({
      where: {
        name,
        active: 1,
        id: { [Op.ne]: id },
      },
    });
    if (existingBranch) {
      return res.status(400).json({
        error: true,
        message: "branch name in use",
      });
    }
    const result = await Branch.update(
      { name, phone, street_name },
      { where: { id } }
    );
    if (result.sqlMessage) {
      return res.status(200).json({
        error: false,
        message: "Account info in use",
      });
    }

    if (result[0] === 0) {
      return res.status(404).json({
        error: true,
        message: "branch not found or no changes made",
      });
    }

    return res.status(200).json({
      error: false,
      message: "branch updated successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteBranch = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Branch.update(
      {
        active: 0,
      },
      { where: { id: id } }
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
