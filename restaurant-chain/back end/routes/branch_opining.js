const express = require("express");
const BranchOpiningRouter = express.Router();
const { addBranchOpeningHours,editBranch} = require("../controllers/branch_opening_day");
// const { authentication } = require("../middlewares/authintication");
// const { authorization } = require("../middlewares/authurization");


BranchOpiningRouter.post("/", addBranchOpeningHours);
BranchOpiningRouter.put("/:id", editBranch);


module.exports = BranchOpiningRouter;