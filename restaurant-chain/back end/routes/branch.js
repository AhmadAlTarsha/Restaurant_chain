const express = require("express");
const BranchRouter = express.Router();
const { addBranch } = require("../controllers/branch");
// const { authentication } = require("../middlewares/authintication");
// const { authorization } = require("../middlewares/authurization");


BranchRouter.post("/", addBranch);

module.exports = BranchRouter;