const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

// const MenuBranch =require("./branch_menu")

const Branch = sequelize.define(
  "branches",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    street_name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
   
    active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    timestamps: false,
  } 
);
// MenuBranch.hasMany(Branch, {
//   foreignKey: "branch_menu_id",
// });
// Branch.belongsTo(MenuBranch, {
//   constraints: true,
//   onDelete: "CASCADE",
//   foreignKey: "branch_menu_id",
// });

module.exports = Branch;
