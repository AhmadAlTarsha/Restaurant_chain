const express = require("express");
const MenuRouter = express.Router();
const { addMenu,getAllMenu } = require("../controllers/menu");
// const { authentication } = require("../middlewares/authintication");
// const { authorization } = require("../middlewares/authurization");


MenuRouter.post("/", addMenu);
MenuRouter.get("/", getAllMenu);

module.exports = MenuRouter;