import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
getMenu,
editItem,
deleteMenuItem,
addMenuItem
} from "../Api/menu/CRUD";

export const GetMenuState = createAsyncThunk(
  "menu/get/branch",
  async (payload) => {
    return await getMenu();
  }
);

export const AddMenuState = createAsyncThunk(
  "colors/add/insurance",
  async (payload) => {
    return await addMenuItem(payload);
  }
);
export const EditMenuItemState = createAsyncThunk(
  "menu/edit/branch",
  async (payload) => {
    return await editItem(payload);
  }
);

export const DeleteMenuItemState = createAsyncThunk(
  "menu/delete/branch",
  async (payload) => {


    
    return await deleteMenuItem(payload);
  }
);

export const MenuSlice = createSlice({
  name: "menu",
  initialState: {
    isLoading: false,
    errorMessage: {
      error: false,
      message: "",
    },
    menu: [],
   menuUpdate: false,
    snackBarMessage: "",
    snackBarStatus: "",
  },

  extraReducers: (builder) => {
    //===========================================================================Get cases
    builder
      .addCase(GetMenuState.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = {
          error: false,
          message: "",
        };
      })
      .addCase(GetMenuState.fulfilled, (state, action) => {
        state.isLoading = false;
        state.menu = action.payload;
        state.errorMessage = {
          isError: false,
          message: "all menu",
        };
      })
      .addCase(GetMenuState.rejected, (state, action) => {
        state.isLoading = true;
        state.errorMessage = {
          isError: true,
          // return err
          message: `${action.payload ?? "Error Getting Menu"}`,
        };
      });
    //===============================================================================Edit cases
    builder
      .addCase(EditMenuItemState.pending, (state) => {
        state.menuUpdate = true;
        state.errorMessage = {
          error: false,
          message: "",
        };
      })
      .addCase(EditMenuItemState.fulfilled, (state, action) => {
        state.snackBarMessage = action.payload.message;
        state.menuUpdate = false;

        state.snackBarStatus = "success";
        state.menu = action.payload.menu;
        state.errorMessage = {
          isError: false,
          message: " item updated",
        };
      })
      .addCase(EditMenuItemState.rejected, (state, action) => {
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
      .addCase(AddMenuState.pending, (state) => {
        state.menuUpdate = true;

        state.errorMessage = {
          error: false,
          message: "",
        };
      })
      .addCase(AddMenuState.fulfilled, (state, action) => {
        state.menuUpdate = false;

        state.snackBarMessage = action.payload.message;
        state.menu = action.payload.menu;
        state.snackBarStatus = "success";
        state.errorMessage = {
          isError: true,
          message: "Added Success",
        };
      })
      .addCase(AddMenuState.rejected, (state, action) => {
        state.errorMessage = {
          isError: true,
          // return err
          message: `${action.payload ?? "Error Adding Color"}`,
        };
        state.menuUpdate = false;
        state.snackBarStatus = "error";
        state.snackBarMessage = action.error.message;
      });

    //===================================================================Delete cases
    builder
      .addCase(DeleteMenuItemState.pending, (state) => {
        state.menuUpdate = true;

        state.errorMessage = {
          error: false,
          message: "",
        };
      })
      .addCase(DeleteMenuItemState.fulfilled, (state, action) => {
        state.menuUpdate = false;

        state.errorMessage = {
          isError: false,
          message: "",
        };
        state.menu = action.payload.menu;
        state.snackBarMessage = action.payload.message;
        state.snackBarStatus = "success";
      })
      .addCase(DeleteMenuItemState.rejected, (state, action) => {
        state.errorMessage = {
          isError: true,
          // return err
          message: `${action.error.message || "Error Deleting menu"}`,
        };

        state.snackBarMessage = action.error.message;
        state.snackBarStatus = "error";
      });
  },
});

export default MenuSlice.reducer;
