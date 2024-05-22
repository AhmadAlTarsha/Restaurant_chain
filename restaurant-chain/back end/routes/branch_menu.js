const express = require("express");
const BranchMenuRouter = express.Router();
const { addBranchMenu, deleteMenuFormBranch } = require("../controllers/branch_menu");
// const { authentication } = require("../middlewares/authintication");
// const { authorization } = require("../middlewares/authurization");


BranchMenuRouter.post("/", addBranchMenu);
BranchMenuRouter.delete("/:id", deleteMenuFormBranch);

module.exports = BranchMenuRouter;