import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addMenuToBranch
} from "../Api/res_bra_menu/CRUD";


export const AddMenuToBranchState = createAsyncThunk(
  "bra_res/add/r",
  async (payload) => {
    return await addMenuToBranch(payload);
  }
);


export const BranchesSlice = createSlice({
  name: "branchesMenus",
  initialState: {
    isLoading: false,
    errorMessage: {
      error: false,
      message: "",
    },
    branchesMenus: [],
    branchesMenusUpdate: false,
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
      .addCase(AddMenuToBranchState.pending, (state) => {
        state.branchesMenusUpdate = true;

        state.errorMessage = {
          error: false,
          message: "",
        };
      })
      .addCase(AddMenuToBranchState.fulfilled, (state, action) => {
console.log(action.payload);

        state.branchesMenusUpdate = false;

        state.snackBarMessage = action.payload.message;
        state.branches = action.payload.branches
        ;
        state.snackBarStatus = "success";
        state.errorMessage = {
          isError: true,
          message: "Added Success",
        };
      })
      .addCase(AddMenuToBranchState.rejected, (state, action) => {
        state.errorMessage = {
          isError: true,
          // return err
          message: `${action.payload ?? "Error Adding Color"}`,
        };
        state.branchUpdate = false;
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

export default BranchesSlice.reducer;
