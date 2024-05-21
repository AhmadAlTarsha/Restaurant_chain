const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Branch = require("./branches");
const MenuItem = require("./menu_item");

const BranchItem = sequelize.define(
  "Branch_Item",
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

Branch.hasMany(BranchItem, {
  foreignKey: "branch_id",
});
BranchItem.belongsTo(Branch, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "branch_id",
});

MenuItem.hasMany(BranchItem, {
  foreignKey: "item_id",
});
BranchItem.belongsTo(MenuItem, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "item_id",
});

module.exports = BranchItem;
