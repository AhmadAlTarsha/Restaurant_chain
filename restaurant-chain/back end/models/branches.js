const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");



const Branch = sequelize.define(
  "branches",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    branch_name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
  
    street: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    building_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },

   
    is_deleted: {
      type: DataTypes.INTEGER,
      required: true,
      defaultValue: 0,
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


module.exports = Branch;
