const express = require("express");
const BranchMaintenanceRouter = express.Router();
const { addMaintenanceToBranch } = require("../controllers/branch_maintenance");



BranchMaintenanceRouter.post("/", addMaintenanceToBranch);
// BranchMaintenanceRouter.delete("/:id", deleteMenuFormBranch);

module.exports = BranchMaintenanceRouter;