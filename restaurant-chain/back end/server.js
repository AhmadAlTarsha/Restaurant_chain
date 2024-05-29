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

const Branch = require("./models/branch");
const Menu = require("./models/menu");
const BranchMenu = require("./models/branch_menu");
const BranchOpeningHours = require("./models/branch_opening_hours");
const BranchMaintenance = require("./models/branch_maintenance");

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

// run the server locally on the desired PORT. Use the following link to open up the server http://localhost:5000`

app.use("*", (req, res) =>
  res.status(404).json({
    error: true,
    message: "NO content at this path",
  })
);
//{ force: true  }
sequelize
  .sync( )
 
  .then((res) => {
    app.listen(PORT, () => {
      // will log to the command line when the server starts
      console.log(`${PORT}`);
    });
  });
