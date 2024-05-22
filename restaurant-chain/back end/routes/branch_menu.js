const express = require("express");
const BranchMenuRouter = express.Router();
const { addBranchMenu } = require("../controllers/branch_menu");
// const { authentication } = require("../middlewares/authintication");
// const { authorization } = require("../middlewares/authurization");


BranchMenuRouter.post("/", addBranchMenu);

module.exports = BranchMenuRouter;