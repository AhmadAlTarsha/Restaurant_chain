// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = require("../utils/db");

// const Branch = require("./branches");

// const BranchLandMarks = sequelize.define(
//   "Branches_land_marks",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true,
//     },
//     land_mark: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       required: true,
//     },
//     created_at: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
//     },
//   },
//   {
//     timestamps: false,
//   }
// );

// Branch.hasMany(BranchLandMarks, {
//   foreignKey: "branch_id",
// });
// BranchLandMarks.belongsTo(Branch, {
//   constraints: true,
//   onDelete: "CASCADE",
//   foreignKey: "branch_id",
// });

// module.exports = BranchLandMarks;
