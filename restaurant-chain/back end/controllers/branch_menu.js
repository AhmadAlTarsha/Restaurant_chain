const BranchMenu = require("../models/branch_menu");




exports.addBranchMenu = async (req, res, next) => {
    const { branch_id, menu_id } = req.body;

    try {
        const [result, created] = await BranchMenu.findOrCreate({
            where: {
                branch_id,
                menu_id
            },
            defaults: {
                branch_id,
                menu_id
            }
        });

        if (!created) {
            return res.status(401).json({
                error: true,
                message: "Branch_menu Already Exists"
            });
        }

        return res.status(200).json({
            error: false,
            message: "Branch_menu Created Successfully"
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
