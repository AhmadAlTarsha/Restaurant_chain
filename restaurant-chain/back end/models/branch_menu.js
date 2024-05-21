const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Branch = require("./branch");
const Menu = require("./menu");

const BranchMenu = sequelize.define(
  "Branches_Menus",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
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

Branch.hasMany(BranchMenu, {
  foreignKey: "branch_id",
});
BranchMenu.belongsTo(Branch, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "branch_id",
});

Menu.hasMany(BranchMenu, {
  foreignKey: "menu_id",
});
BranchMenu.belongsTo(Menu, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "menu_id",
});

module.exports = BranchMenu;
