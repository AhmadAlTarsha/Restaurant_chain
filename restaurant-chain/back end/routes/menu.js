const express = require("express");
const MenuRouter = express.Router();
const { addMenu,getAllMenu,deleteMenu,editMenu } = require("../controllers/menu");
// const { authentication } = require("../middlewares/authintication");
// const { authorization } = require("../middlewares/authurization");


MenuRouter.post("/", addMenu);
MenuRouter.get("/", getAllMenu);
MenuRouter.delete("/:id", deleteMenu);
MenuRouter.put("/:id", editMenu);

module.exports = MenuRouter;