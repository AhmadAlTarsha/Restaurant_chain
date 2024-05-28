// require express

const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./utils/db");

const cors = require("cors");
require("dotenv").config();

const app = express();



app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
const PORT = 5001;

//=======================Models=====================
// const PoliceImage = require("./routes/policeImage");
// const TypePermission = require("./routes/type_permission");
const Branch = require("./models/branch");
const Menu = require("./models/menu");
const BranchMenu = require("./models/branch_menu");
const BranchOpeningHours = require("./models/branch_opening_hours");
const BranchMaintenance = require("./models/branch_maintenance");
// const StatusRoute = require("./routes/status");
// const typeRouter = require("./routes/user_type");
// const GovernorateRouter = require("./routes/governorate");
// const RegionRouter = require("./routes/region");
// const PermissionRouter = require("./routes/permissions");
// const SparePhone = require("./routes/sparePhone");
// =======================Routes======================
const branchRouter = require("./routes/branch");
const menuRouter = require("./routes/menu");
const branchMenuRouter = require("./routes/branch_menu");
const branchOpiningRouter = require("./routes/branch_opining");
const MaintenanceRouter = require("./routes/maintenance");
const branchMaintenanceRouter = require("./routes/branch_maintenance");



//================================
app.use("/branch", branchRouter);
app.use("/menu", menuRouter);
app.use("/branch_menu", branchMenuRouter);
app.use("/branch_opining", branchOpiningRouter);
app.use("/maintenance", MaintenanceRouter);
app.use("/branch_maintenance", branchMaintenanceRouter);
// app.use("/type_permission", TypePermission);
// app.use("/permissions", PermissionRouter);
// app.use("/region", RegionRouter);
// app.use("/governorate", GovernorateRouter);
// app.use("/status", StatusRoute);
// app.use("/types", typeRouter);
// app.use("/police", PoliceImage);
// app.use("/user", SparePhone);
//================================

// const usersRouter = require("./routes/users");
// const questionsRouter = require("./routes/questions");
// const guidesRouter = require("./routes/guides");
// const aboutRouter = require("./routes/aboutUs");
// const contactUsRouter = require("./routes/contactUs");
// const partnerUsRouter = require("./routes/partners");
// const insuranceRouter = require("./routes/insurance");
// const carColorsRouter = require("./routes/carColors");
// const carModelRouter = require("./routes/carModels");
// const insurancePoliciesRouter = require("./routes/Insurancepolicise");
// const notesRouter = require("./routes/note");
// app.use("/insurance-policies", insurancePoliciesRouter);
// app.use("/users", usersRouter);
// app.use("/questions", questionsRouter);
// app.use("/guide", guidesRouter);
// app.use("/about", aboutRouter);
// app.use("/contact", contactUsRouter);
// app.use("/notes", notesRouter);
// app.use("/strategic-partner", partnerUsRouter);
// app.use("/insurance-companies", insuranceRouter);
// app.use("/car-colors", carColorsRouter);
// app.use("/cars", carModelRouter);

// run the server locally on the desired PORT. Use the following link to open up the server http://localhost:5000`

app.use("*", (req, res) =>
  res.status(404).json({
    error: true,
    message: "NO content at this path",
  })
);
// { force: true  }
sequelize
  .sync()
 
  .then((res) => {
    app.listen(PORT, () => {
      // will log to the command line when the server starts
      console.log(`${PORT}`);
    });
  });
