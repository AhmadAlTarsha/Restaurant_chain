import { configureStore } from "@reduxjs/toolkit";
import MenuReducers from "./Menu";
import BranchReducers from "./res_Branches";
import branchesMaintenanceReducers from "./branch_maintenance";
// import ColorsReducers from "./CarColors";
// import NoteReducers from "./Note";
// import ModelReducers from "./CarModels"
// import PoliciesReducers from "./InsurancePolicies";
// import PartnerReducers from "./Partners";

export default configureStore({
  reducer: {
    menu: MenuReducers,
    branch: BranchReducers,
    branchesMaintenance:branchesMaintenanceReducers
    // notes: NoteReducers,
    // colors: ColorsReducers,
    // models:ModelReducers,
    // policies:PoliciesReducers,
    // partners:PartnerReducers,
  },
});