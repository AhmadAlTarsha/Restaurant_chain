const express = require("express");
const BranchRouter = express.Router();
const { addBranch,getAllBranches ,getBranchById,editBranch} = require("../controllers/branch");
// const { authentication } = require("../middlewares/authintication");
// const { authorization } = require("../middlewares/authurization");


BranchRouter.post("/", addBranch);
BranchRouter.get("/", getAllBranches);
BranchRouter.get("/:id", getBranchById);
BranchRouter.put("/:id", editBranch);

module.exports = BranchRouter;