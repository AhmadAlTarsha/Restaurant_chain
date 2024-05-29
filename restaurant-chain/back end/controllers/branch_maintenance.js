const MaintenanceBranch = require("../models/branch_maintenance");

exports.addMaintenanceToBranch = async (req, res, next) => {
  const { price, from_date, to_date, branch_id, maintenance_id } = req.body;

  try {
   const [result,created]= await MaintenanceBranch.findOrCreate({
      where: { branch_id },
      defaults: {
        branch_id,
        maintenance_id,
        price,
        from_date,
        to_date,
      },
    });



    if (!created) {
      return res.status(401).json({
        error: true,
        message: "this branch Already in maintenance",
      });
    }

    return res.status(200).json({
      error: false,
      message: "Maintenance Created Successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllMaintenanceBranch = async (req, res, next) => {
  try {
    const result = await MaintenanceBranch.findAll();

    if (result[0]?._options.raw) {
      return res.status(200).json({
        error: false,
        MaintenanceBranch: result,
      });
    } else if (result.length === 0) {
      return res.status(201).json({
        error: false,
        message: "no branch in Maintenance added yet",
        all_Menu: [],
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// exports.editMenu = async (req, res, next) => {
//   const { id } = req.params;
//   const { name } = req.body;

//   try {
//     const existingMenu = await Menu.findOne({
//       where: {
//         name,
//         active: 1,
//         id: { [Op.ne]: id },
//       },
//     });

//     if (existingMenu) {
//       return res.status(400).json({
//         error: true,
//         message: "Menu name in ",
//       });
//     }

//     const result = await Menu.update({ name }, { where: { id } });

//     if (result[0] === 0) {
//       return res.status(404).json({
//         error: true,
//         message: "Menu not found or no changes made",
//       });
//     }

//     return res.status(200).json({
//       error: false,
//       message: "Menu updated successfully",
//     });
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// };

// exports.deleteMenu = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const [result] = await Menu.update(
//       {
//         active: 0,
//       },
//       { where: { id: id } }
//     );

//     console.log(result);

//     if (result) {
//       return res.status(200).json({
//         error: false,
//         message: "menu deleted successfully",
//       });
//     }

//     throw new Error("error while deleting menu !");
//   } catch (err) {
//     return res.status(500).json({
//       error: true,
//       message: "Error ",
//       error: err,
//     });
//   }
// };
