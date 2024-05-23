const Menu = require("../models/menu");



exports.addMenu = async (req, res, next) => {
    const {name} = req.body;

    try {
      const result = await Menu.findOrCreate({
        where: { name },
        defaults: {
          name,
         
        
        },
      });
  
      if (!result[0]._options.isNewRecord) {
        return res.status(401).json({
          error: true,
          message: "menu Already Exist",
        });
      }else if (result.length === 0) {
        return res.status(201).json({
          error: false,
          message: "no menu added yet",
        });
      }
  
      return res.status(200).json({
        error: false,
        message: "menu Created Successfully",
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };

  exports.getAllMenu = async (req, res, next) => {
    try {
      const result = await Menu.findAll();
  
      if (result[0]?._options.raw) {
        return res.status(200).json({
          error: false,
          all_Menu: result,
        });
      } else if (result.length === 0) {
        return res.status(201).json({
          error: false,
          message: "no menu added yet",
        });
      }
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };

  exports.editMenu = async (req, res, next) => {
    const { id } = req.params;
    const { name} = req.body;
  
    try {
      const result = await Menu.update(
        { name },
        { where: { id } }
      );
      if (result.sqlMessage) {
        return res.status(200).json({
          error: false,
          message: "menu name in use",
        });
      }
      if (result) {
        return res.status(200).json({
          error: false,
          message: "menu updated successfully",
        });
      }
  
      return throwError(400, "Something went wrong");
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };

  exports.deleteMenu = async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await Menu.update(
        {
          active: 0,
        },
        { where: { id: id } }
      );
  
      console.log(result);
  
      if (result) {
        return res.status(200).json({
          error: false,
          message: "menu deleted successfully",
        });
      }
      
      throw new Error("error while deleting menu !");
    } catch (err) {
      return res.status(500).json({
        error: true,
        message: "Error ",
        error: err,
      });
    }
  };