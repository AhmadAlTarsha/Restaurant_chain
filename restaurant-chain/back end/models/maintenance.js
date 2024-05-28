const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Branch = require("./branch");
// const Menu = require("./menu");

const Maintenance = sequelize.define(
  "Maintenance",
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
  
    },
 
  },
  {
    timestamps: false,
   
  }
);




module.exports = Maintenance;
