const express = require("express");
const MaintenanceRouter = express.Router();
const { addMaintenanceType } = require("../controllers/maintenance");
// const { authentication } = require("../middlewares/authintication");
// const { authorization } = require("../middlewares/authurization");


MaintenanceRouter.post("/", addMaintenanceType);
// MaintenanceRouter.get("/", getAllMenu);
// MaintenanceRouter.delete("/:id", deleteMenu);
// MaintenanceRouter.put("/:id", editMenu);

module.exports = MaintenanceRouter;