import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getBranches,
  addBranch,
  deleteBranch,
  editBranch,
} from "../Api/res_Branch/CRUD";

export const GetBranchesState = createAsyncThunk(
  "branch/get/r",
  async (payload) => {
    return await getBranches();
  }
);

export const AddBranchesState = createAsyncThunk(
  "branch/add/r",
  async (payload) => {
    return await addBranch(payload);
  }
);
export const EditBranchesState = createAsyncThunk(
  "branch/edit/r",
  async (payload) => {
    return await editBranch(payload);
  }
);

export const DeleteBranchesState = createAsyncThunk(
  "branch/delete/r",
  async (payload) => {
    return await deleteBranch(payload);
  }
);

export const BranchesSlice = createSlice({
  name: "branches",
  initialState: {
    isLoading: false,
    errorMessage: {
      error: false,
      message: "",
    },
    branches: [],
    branchUpdate: false,
    snackBarMessage: "",
    snackBarStatus: "",
  },

  extraReducers: (builder) => {
    //===========================================================================Get cases
    builder
      .addCase(GetBranchesState.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = {
          error: false,
          message: "",
        };
      })
      .addCase(GetBranchesState.fulfilled, (state, action) => {

        console.log(action);
        state.isLoading = false;
        state.branches = action.payload;
        state.errorMessage = {
          isError: false,
          message: "all branch",
        };
      })
      .addCase(GetBranchesState.rejected, (state, action) => {
        state.isLoading = true;
        state.errorMessage = {
          isError: true,
          // return err
          message: `${action.payload ?? "Error Getting Branch"}`,
        };
      });
    //===============================================================================Edit cases
    builder
      .addCase(EditBranchesState.pending, (state) => {
        state.branchUpdate = true;
        state.errorMessage = {
          error: false,
          message: "",
        };
      })
      .addCase(EditBranchesState.fulfilled, (state, action) => {
        state.snackBarMessage = action.payload.message;
        state.branchUpdate = false;

        state.snackBarStatus = "success";
        state.branchUpdate = action.payload.menu;
        state.errorMessage = {
          isError: false,
          message: " item updated",
        };
      })
      .addCase(EditBranchesState.rejected, (state, action) => {
        state.errorMessage = {
          isError: true,
          // return err
          message: `${action.payload ?? "Error update menu"}`,
        };
        // state.colorUpdate = false;
        state.snackBarStatus = "error";
        state.snackBarMessage = action.error.message;
        state.menuUpdate = false;
      });

    // //================================================================Add cases
    builder
      .addCase(AddBranchesState.pending, (state) => {
        state.branchUpdate = true;

        state.errorMessage = {
          error: false,
          message: "",
        };
      })
      .addCase(AddBranchesState.fulfilled, (state, action) => {
        state.branchUpdate = false;
console.log(action.payload);
        state.snackBarMessage = action.payload.message;
        state.branches = action.payload.branches
        ;
        state.snackBarStatus = "success";
        state.errorMessage = {
          isError: true,
          message: "Added Success",
        };
      })
      .addCase(AddBranchesState.rejected, (state, action) => {
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
    builder
      .addCase(DeleteBranchesState.pending, (state) => {
        state.branchUpdate = true;

        state.errorMessage = {
          error: false,
          message: "",
        };
      })
      .addCase(DeleteBranchesState.fulfilled, (state, action) => {
        state.branchUpdate = false;

        state.errorMessage = {
          isError: false,
          message: "",
        };
        state.branches = action.payload.branches;
        state.snackBarMessage = action.payload.message;
        state.snackBarStatus = "success";
      })
      .addCase(DeleteBranchesState.rejected, (state, action) => {
        state.errorMessage = {
          isError: true,
          // return err
          message: `${action.error.message || "Error Deleting branches"}`,
        };

        state.snackBarMessage = action.error.message;
        state.snackBarStatus = "error";
      });
  },
});

export default BranchesSlice.reducer;
