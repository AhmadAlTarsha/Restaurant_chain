import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
getMenu,
editItem,
} from "../Api/menu/CRUD";

export const GetMenuState = createAsyncThunk(
  "menu/get/branch",
  async (payload) => {
    return await getMenu();
  }
);

// export const AddCarColorsState = createAsyncThunk(
//   "colors/add/insurance",
//   async (payload) => {
//     return await addCarColors(payload);
//   }
// );
export const EditMenuItemState = createAsyncThunk(
  "colors/edit/insurance",
  async (payload) => {
    return await editItem(payload);
  }
);

// export const DeleteCarColorsState = createAsyncThunk(
//   "colors/delete/insurance",
//   async (payload) => {
//     return await deleteCarColor(payload);
//   }
// );

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
    // builder
    //   .addCase(AddCarColorsState.pending, (state) => {
    //     state.colorUpdate = true;

    //     state.errorMessage = {
    //       error: false,
    //       message: "",
    //     };
    //   })
    //   .addCase(AddCarColorsState.fulfilled, (state, action) => {
    //     state.colorUpdate = false;

    //     state.snackBarMessage = action.payload.message;
    //     state.colors = action.payload.colors;
    //     state.snackBarStatus = "success";
    //     state.errorMessage = {
    //       isError: true,
    //       message: "Added Success",
    //     };
    //   })
    //   .addCase(AddCarColorsState.rejected, (state, action) => {
    //     state.errorMessage = {
    //       isError: true,
    //       // return err
    //       message: `${action.payload ?? "Error Adding Color"}`,
    //     };
    //     state.colorUpdate = false;
    //     state.snackBarStatus = "error";
    //     state.snackBarMessage = action.error.message;
    //   });

    // //===================================================================Delete cases
    // builder
    //   .addCase(DeleteCarColorsState.pending, (state) => {
    //     state.colorUpdate = true;

    //     state.errorMessage = {
    //       error: false,
    //       message: "",
    //     };
    //   })
    //   .addCase(DeleteCarColorsState.fulfilled, (state, action) => {
    //     state.colorUpdate = false;

    //     state.errorMessage = {
    //       isError: false,
    //       message: "",
    //     };
    //     state.colors = action.payload.colors;
    //     state.snackBarMessage = action.payload.message;
    //     state.snackBarStatus = "success";
    //   })
    //   .addCase(DeleteCarColorsState.rejected, (state, action) => {
    //     state.errorMessage = {
    //       isError: true,
    //       // return err
    //       message: `${action.error.message || "Error Deleting Color"}`,
    //     };

    //     state.snackBarMessage = action.error.message;
    //     state.snackBarStatus = "error";
    //   });
  },
});

export default MenuSlice.reducer;
