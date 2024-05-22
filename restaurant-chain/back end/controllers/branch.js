const Branch = require("../models/branch");



exports.addBranch = async (req, res, next) => {
    const { name, phone, street_name} = req.body;
  
    try {
      const result = await Branch.findOrCreate({
        where: { name },
        defaults: {
          name,
          phone,
          street_name,
        
        },
      });
  
      if (!result[0]._options.isNewRecord) {
        return res.status(401).json({
          error: true,
          message: "Branch Already Exist",
        });
      }
  
      return res.status(200).json({
        error: false,
        message: "Branch Created Successfully",
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };