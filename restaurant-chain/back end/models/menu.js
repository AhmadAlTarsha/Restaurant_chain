const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const  Branch = require("./branch");

const Menu= sequelize.define(
  "Menus",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
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

// // Branch.hasMany(Menu, {
// //   foreignKey: "branch_id",
// // });
// // Menu.belongsTo(Branch, {
// //   constraints: true,
// //   onDelete: "CASCADE",
// //   foreignKey: "branch_id",
// // });

module.exports = Menu;
