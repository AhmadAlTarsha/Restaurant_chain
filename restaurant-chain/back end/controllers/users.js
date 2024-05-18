// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../models/user");
// const UserType = require("../models/user_type");
// const Region = require("../models/region");
// const Status = require("../models/status");
// const Governorate = require("../models/governorate");
// const TypePermission = require("../models/type_permission");
// const Permission = require("../models/permission");
// const SparePhone = require("../models/users_spare_phone");
// const PoliceImage = require("../models/policyImage");
// const path = require("path");

// const { mwError } = require("../middleware/throwError");
// const fs = require("fs");
// const clearImage = (filePath) => {
//   filePath = path.join(__dirname, "..", filePath);
//   fs.unlink(filePath, (err) => {
//     console.log(err);
//   });
// };
// //---------------------------------------------------- signup function to signup new user

// exports.signup = async (req, res, next) => {
//   const {
//     full_name,
//     email,
//     user_name,
//     password,
//     nationality,
//     birth_date,
//     nationality_id,
//     user_phone,
//     spare_phone,
//     street,
//     building_number,
//     user_type_id,
//     status_id,
//     region_id,
//   } = req.body;

//   let image;

//   if (req.file) {
//     image = req.file.path.replace("\\", "/");
//   } else {
//     return mwError(500, "no image provided");
//   }

//   try {
//     const encryptedPassword = await bcrypt.hash(
//       password,
//       parseInt(process.env.SALT)
//     );

//     const [result] = await User.findOrCreate({
//       where: { email: email.toLowerCase() },
//       defaults: {
//         email: email.toLowerCase(),
//         full_name,
//         password: encryptedPassword,
//         user_name,
//         nationality,
//         birth_date,
//         nationality_id,
//         user_phone,
//         spare_phone,
//         street,
//         building_number,
//         user_type_id,
//         status_id,
//         region_id,
//         civil_identity_image: image,
//       },
//     });

//     if (!result._options.isNewRecord) {
//       clearImage(image);

//       return res.status(401).json({
//         error: true,
//         message: "User Already Registered",
//       });
//     } else if (result._options.isNewRecord) {
//       return res.status(201).json({
//         error: false,
//         user: result[0],
//         message: "Account Created Successfully",
//       });
//     }
//   } catch (error) {
//     clearImage(image);
//     if (error.message) {
//       return res.status(500).json({
//         error: true,
//         message: error.message,
//       });
//     }
//     if (!error.statusCode) {
//       err.statusCode = 500;
//       next(error);
//     }
//   }
// };

// exports.getUserById = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const result = await User.findByPk(id, {
//       include: [
//         {
//           model: UserType,
//           attributes: ["type"],
//           include: [
//             {
//               model: TypePermission,
//               attributes: ["permission_id"],
//               include: [{ model: Permission, attributes: ["name"] }],
//             },
//           ],
//         },
//         {
//           model: Region,
//           attributes: ["name"],
//           include: [{ model: Governorate, attributes: ["name"] }],
//         },
//         { model: Status, attributes: ["name"] },
//         { model: SparePhone, attributes: ["phone"] },
//         { model: PoliceImage, attributes: ["policy"] },
//       ],
//       attributes: { exclude: ["status_id", "region_id", "user_type_id"] },
//     });
//     res.status(200).json({
//       error: false,
//       user: result,
//     });
//     return mwErrorError("Error");
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// };

// exports.getAllUsers = async (req, res, next) => {
//   try {
//     const result = await User.findAll({
//       include: [
//         { model: UserType, attributes: ["type"] },
//         {
//           model: Region,
//           attributes: ["name"],
//           include: [{ model: Governorate, attributes: ["name"] }],
//         },
//         { model: Status, attributes: ["name"] },
//       ],
//       attributes: { exclude: ["status_id", "region_id", "user_type_id"] },
//     });

//     res.status(200).json({
//       error: false,
//       users: result,
//     });
//     return Error("Error !!");
//   } catch (error) {
//     next(error);
//   }
// };

// exports.login = async (req, res, next) => {
//   let token = "";
//   let user = {};

//   let { email, password } = req.body;

//   try {
//     const result = await User.findOne({
//       where: { email: email.toLowerCase() },
//       include: {
//         model: UserType,
//         attributes: ["type"],
//         include: [
//           {
//             model: TypePermission,
//             attributes: ["permission_id"],
//             include: [{ model: Permission, attributes: ["name"] }],
//           },
//         ],
//       },
//     });

//     if (result?.dataValues?.id) {
//       const isValidPassword = await bcrypt.compare(
//         password,
//         result?.dataValues?.password
//       );
//       if (!isValidPassword) {
//         return mwErrorError(404, "Email or Password is incorrect");
//       }

//       user = result?.dataValues;
//       const TypePermission = result.user_type.type_permissions.map((data) => {
//         return data.Permission.name;
//       });
//       user.Permission = TypePermission;

//       const payLoad = {
//         user,
//       };
//       const options = {
//         expiresIn: "7d",
//       };

//       token = jwt.sign(payLoad, process.env.SECRET, options);

//       return res.status(200).json({
//         error: false,
//         message: "Login Successfully",
//         id: user.id,
//         token,
//       });
//     }
//     return mwError(404, "Error !!");
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// };

// //!------------------------------------------------------------use from manager or admin
// exports.updateUserInfoById = async (req, res, next) => {
//   try {
//     const {
//       full_name,
//       user_name,
//       email,
//       nationality_id,
//       nationality,
//       region_id,
//       street,
//       building_number,
//       birth_date,
//     } = req.body;
//     const { id } = req.params;

//     const [result] = await User.update(
//       {
//         full_name,
//         user_name,
//         email,
//         nationality_id,
//         nationality,
//         region_id,
//         street,
//         building_number,
//         birth_date,
//       },
//       { where: { id } }
//     );

//     if (result.sqlMessage) {
//       return res.status(200).json({
//         error: false,
//         message: "Account info in use",
//       });
//     }
//     if (result) {
//       return res.status(200).json({
//         error: false,
//         message: "Account updated successfully",
//       });
//     }

//     throw new Error("server error or invalid data");
//   } catch (err) {
//     return res.status(500).json({
//       error: true,
//       message: err.message,
//     });
//     next(err);
//   }
// };

// exports.updateUserImage = async (req, res, next) => {
//   let image;
//   try {
//     if (req.file) {
//       image = req.file.path.replace("\\", "/");
//     }
//     const { id } = req.params;
//     const {
//       dataValues: { civil_identity_image },
//     } = await User.findByPk(id, {
//       attributes: ["civil_identity_image"],
//     });

//     const [result] = await User.update(
//       {
//         civil_identity_image: image,
//       },
//       { where: { id } }
//     );

//     if (result) {
//       clearImage(civil_identity_image);
//       return res.status(200).json({
//         error: false,
//         message: "image updated successfully",
//       });
//     }
//   } catch (err) {
//     clearImage(image);
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// };
// exports.updateUserMainPhone = async (req, res, next) => {
//   const { user_phone } = req.body;
//   const { id } = req.params;

//   const [result] = await User.update(
//     {
//       user_phone,
//     },
//     { where: { id } }
//   );

//   try {
  

//     if (result) {
//       return res.status(200).json({
//         error: false,
//         message: "user Main phone updated successfully",
//       });
//     }
//     throw new Error("error");
//   } catch (err) {
  
//     return res.status(500).json({
//       error: true,
//     });
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// };
// exports.updateUserStatus = async (req, res, next) => {
//   const { status_id } = req.body;
//   const { id } = req.params;

//   const [result] = await User.update(
//     {
//       status_id,
//     },
//     { where: { id } }
//   );

//   try {
  

//     if (result) {
//       return res.status(200).json({
//         error: false,
//         message: "user status updated successfully",
//       });
//     }
//     throw new Error("error");
//   } catch (err) {
  
//     return res.status(500).json({
//       error: true,
//     });
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// };



// // exports.updateUserSparePhone = async (req, res, next) => {
// //   const { spare_phone } = req.body;
// //   const { id } = req.params;

// //   const [result] = await User.update(
// //     {
// //       spare_phone,
// //     },
// //     { where: { id } }
// //   );

// //   try {
  

// //     if (result) {
// //       return res.status(200).json({
// //         error: false,
// //         message: "user spare phone updated successfully",
// //       });
// //     }
// //     throw new Error("error");
// //   } catch (err) {
  
// //     return res.status(500).json({
// //       error: true,
// //     });
// //     if (!err.statusCode) {
// //       err.statusCode = 500;
// //     }
// //     next(err);
// //   }
// // };

// // exports.login = async (req, res) => {
// //   const { email, password } = req.body;

// //   try {
// //     const query = `SELECT * FROM users WHERE email = $1`;
// //     const data = [email.toLowerCase()];
// //     const result = await pool.query(query, data);

// //     if (result.rows.length === 0) {
// //       return res
// //         .status(401)
// //         .json({ error: true, message: "The email does not exist." });
// //     }

// //     const user = result.rows[0];
// //     const match = await bcrypt.compare(password, user.password);

// //     if (!match) {
// //       return res.status(401).json({ error: true, message: "Wrong password." });
// //     }

// //     // Payload for access token
// //     const payload = { userId: user.id, name: user.full_name };
// //     const secret = process.env.SECRET;
// //     const accessTokenOptions = { expiresIn: "15m" }; // Example: short-lived access token
// //     const accessToken = jwt.sign(payload, secret, accessTokenOptions);

// //     // Generate a refresh token with a different payload and longer lifespan
// //     const refreshTokenOptions = { expiresIn: "7d" }; // Example: long-lived refresh token
// //     const refreshToken = jwt.sign(
// //       { userId: user.id },
// //       secret,
// //       refreshTokenOptions
// //     );

// //     // Store the refresh token in your database
// //     // Example function call (you'll need to implement this according to your database schema)
// //     // await storeRefreshToken(user.id, refreshToken);

// //     return res.status(200).json({
// //       accessToken,
// //       refreshToken, // Send the refresh token to the client
// //       error: false,
// //       message: "Login successfully",
// //       userId: user.id,
// //     });
// //   } catch (err) {
// //     console.error(err);
// //     return res.status(500).json({ error: true, message: "An error occurred." });
// //   }
// // };
