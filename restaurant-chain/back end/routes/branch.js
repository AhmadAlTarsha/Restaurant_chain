const express = require("express");
const BranchRouter = express.Router();
const { addBranch,getAllBranches } = require("../controllers/branch");
// const { authentication } = require("../middlewares/authintication");
// const { authorization } = require("../middlewares/authurization");


BranchRouter.post("/", addBranch);
BranchRouter.get("/", getAllBranches);

module.exports = BranchRouter;