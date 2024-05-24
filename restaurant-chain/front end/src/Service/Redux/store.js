import { configureStore } from "@reduxjs/toolkit";
import MenuReducers from "./Menu";
import BranchReducers from "./res_Branches";
// import ColorsReducers from "./CarColors";
// import NoteReducers from "./Note";
// import ModelReducers from "./CarModels"
// import PoliciesReducers from "./InsurancePolicies";
// import PartnerReducers from "./Partners";

export default configureStore({
  reducer: {
    menu: MenuReducers,
    branch: BranchReducers,
    // notes: NoteReducers,
    // colors: ColorsReducers,
    // models:ModelReducers,
    // policies:PoliciesReducers,
    // partners:PartnerReducers,
  },
});