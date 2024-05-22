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