import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
addMaintenanceToBranch
} from "../Api/branch_maintenance/CRUD";


export const AddMaintenanceToBranchState = createAsyncThunk(
  "bra_m/add/r",
  async (payload) => {
    return await addMaintenanceToBranch(payload);
  }
);


export const BranchesMaintenanceSlice = createSlice({
  name: "branchesMaintenance",
  initialState: {
    isLoading: false,
    errorMessage: {
      error: false,
      message: "",
    },
    branchesMaintenance: [],
    branchesMaintenanceUpdate: false,
    snackBarMessage: "",
    snackBarStatus: "",
  },

  extraReducers: (builder) => {
    //===========================================================================Get cases
    // builder
    //   .addCase(GetBranchesState.pending, (state) => {
    //     state.isLoading = true;
    //     state.errorMessage = {
    //       error: false,
    //       message: "",
    //     };
    //   })
    //   .addCase(GetBranchesState.fulfilled, (state, action) => {

        
    //     state.isLoading = false;
    //     state.branches = action.payload;
    //     state.errorMessage = {
    //       isError: false,
    //       message: "all branch",
    //     };
    //   })
    //   .addCase(GetBranchesState.rejected, (state, action) => {
    //     state.isLoading = true;
    //     state.errorMessage = {
    //       isError: true,
    //       // return err
    //       message: `${action.payload ?? "Error Getting Branch"}`,
    //     };
    //   });
    //===============================================================================Edit cases
    // builder
    //   .addCase(EditBranchesState.pending, (state) => {
    //     state.branchUpdate = true;
    //     state.errorMessage = {
    //       error: false,
    //       message: "",
    //     };
    //   })
    //   .addCase(EditBranchesState.fulfilled, (state, action) => {
    //     console.log(action.payload);
    //     state.snackBarMessage = action.payload.message;
    //     state.branchUpdate = false;

    //     state.snackBarStatus = "success";
    //     state.branches = action.payload.branches;
    //     state.errorMessage = {
    //       isError: false,
    //       message: " branch updated",
    //     };
    //   })
    //   .addCase(EditBranchesState.rejected, (state, action) => {
    //     state.errorMessage = {
    //       isError: true,
    //       // return err
    //       message: `${action.payload ?? "Error update branch"}`,
    //     };
    //     // state.colorUpdate = false;
    //     state.snackBarStatus = "error";
    //     state.snackBarMessage = action.error.message;
    //     state.branchUpdate = false;
    //   });

    //================================================================Add cases
    builder
      .addCase(AddMaintenanceToBranchState.pending, (state) => {
        state.branchesMaintenanceUpdate = true;

        state.errorMessage = {
          error: false,
          message: "",
        };
      })
      .addCase(AddMaintenanceToBranchState.fulfilled, (state, action) => {
console.log(action.payload);

        state.branchesMaintenanceUpdate = false;

        state.snackBarMessage = action.payload.message;
        state.branchesMaintenance = action.payload.branches
        ;
        state.snackBarStatus = "success";
        state.errorMessage = {
          isError: true,
          message: "Added Success",
        };
      })
      .addCase(AddMaintenanceToBranchState.rejected, (state, action) => {
        state.errorMessage = {
          isError: true,
          // return err
          message: `${action.payload ?? "Error Adding maintenance"}`,
        };
        state.branchesOpiningUpdate = false;
        state.snackBarStatus = "error";
        state.snackBarMessage = action.error.message;
      });

    //===================================================================Delete cases
    // builder
    //   .addCase(DeleteBranchesState.pending, (state) => {
    //     state.branchUpdate = true;

    //     state.errorMessage = {
    //       error: false,
    //       message: "",
    //     };
    //   })
    //   .addCase(DeleteBranchesState.fulfilled, (state, action) => {
    //     state.branchUpdate = false;

    //     state.errorMessage = {
    //       isError: false,
    //       message: "",
    //     };
    //     state.branches = action.payload.branches;
    //     state.snackBarMessage = action.payload.message;
    //     state.snackBarStatus = "success";
    //   })
    //   .addCase(DeleteBranchesState.rejected, (state, action) => {
    //     state.errorMessage = {
    //       isError: true,
    //       // return err
    //       message: `${action.error.message || "Error Deleting branches"}`,
    //     };

    //     state.snackBarMessage = action.error.message;
    //     state.snackBarStatus = "error";
    //   });
  },
});

export default BranchesMaintenanceSlice.reducer;
