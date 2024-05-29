const express = require("express");
const BranchMaintenanceRouter = express.Router();
const { addMaintenanceToBranch ,getAllMaintenanceBranch} = require("../controllers/branch_maintenance");



BranchMaintenanceRouter.post("/", addMaintenanceToBranch);
BranchMaintenanceRouter.get("/", getAllMaintenanceBranch);

module.exports = BranchMaintenanceRouter;