const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Branch = require("./branch");
const Maintenance = require("./maintenance");

const BranchMaintenance = sequelize.define(
  "Branches_Maintenance",
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
    from_date: {
      type: DataTypes.STRING,
      required: true,
    },
    to_date: {
      type: DataTypes.TEXT,
      required: true,
    },
    price: {
      type: DataTypes.DOUBLE,
      required: true,
    },
    comment: {
      type: DataTypes.TEXT,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

Branch.hasMany(BranchMaintenance, {
  foreignKey: "branch_id",
});
BranchMaintenance.belongsTo(Branch, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "branch_id",
});

Maintenance.hasMany(BranchMaintenance, {
  foreignKey: "maintenance_id",
});
BranchMaintenance.belongsTo(Maintenance, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "maintenance_id",
});

module.exports = BranchMaintenance;
