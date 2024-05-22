const express = require("express");
const MenuRouter = express.Router();
const { addMenu } = require("../controllers/menu");
// const { authentication } = require("../middlewares/authintication");
// const { authorization } = require("../middlewares/authurization");


MenuRouter.post("/", addMenu);

module.exports = MenuRouter;