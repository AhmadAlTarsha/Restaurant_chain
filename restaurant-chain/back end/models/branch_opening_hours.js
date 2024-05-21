const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Branch = require("./branch");


const BranchOpeningHours = sequelize.define(
  "branches_opening_hours",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    start_time: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    end_time: {
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

Branch.hasMany(BranchOpeningHours, {
  foreignKey: "branch_id",
});
BranchOpeningHours.belongsTo(Branch, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "branch_id",
});

module.exports = BranchOpeningHours;
