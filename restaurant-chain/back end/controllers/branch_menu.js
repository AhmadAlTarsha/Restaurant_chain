const BranchMenu = require("../models/branch_menu");



exports.addBranchMenu = async (req, res, next) => {
    const { branch_id, menu_id,} = req.body;
  
    try {
      const result = await BranchMenu.create({
    
      
          branch_id,
          menu_id,
        
        
        
      });
  
    //   if (!result[0]._options.isNewRecord) {
    //     return res.status(401).json({
    //       error: true,
    //       message: "Branch_menu Already Exist",
    //     });
    //   }
  console.log("======================",result);
      return res.status(200).json({
        error: false,
        message: "Branch_menu Created Successfully",
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };