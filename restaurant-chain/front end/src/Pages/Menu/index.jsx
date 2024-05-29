//!react import;
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
//!mui import
import { Delete, Edit } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { Box, IconButton, Tooltip, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";

//!file import
import CenteredCircularProgress from "../../Components/Loader/index";
import {
  GetMenuState,
  EditMenuItemState,
  DeleteMenuItemState,
  AddMenuState,
} from "../../Service/Redux/Menu";
import EditModal from "../../Components/EditModal";
import ConfirmedAndEditDialog from "../../Components/ConfirmedDialog";
import AddModal from "../../Components/AddModal";
import SimpleSnackbar from "../../Components/Snackbar";
const Menu = () => {
  const itemName = "menu item";
  const dispatch = useDispatch();
  const theme = useTheme();

  const [menuData, setMenuData] = useState({
    menuId: 0,
    active: 0,
  });
  const [content, setContent] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [snackBarText, setSnackBarText] = useState("");
  const [snackBarStatus, setSnackBarStatus] = useState("");

  const handleClickOpenConfirmDialog = () => setOpenDialog(true);
  const handleCloseConfirmedDialog = () => setOpenDialog(false);
  const handleShowEditModel = () => setShowEditModal(true);
  const handleCloseEditModel = () => setShowEditModal(false);
  const handleShowAddModel = () => setShowAddModal(true);
  const handleCloseAddModel = () => setShowAddModal(false);

  //========================================================

  const menuSelector = useSelector((state) => {
    return state.menu;
  });

  const menu = menuSelector?.menu?.filter((item) => {
    return item.active === 1;
  });

  //*------------------------------------------this function to delete color from DB

  const deleteCurrentMenuItem = async (menuId, active) => {
    dispatch(
      DeleteMenuItemState({
        menuId,
        active: active,
      })
    );
    handleCloseConfirmedDialog();
  };
  // //*------------------------------------------this function to update menu item in the DB

  const updateCurrentMenuItem = async (menuId) => {
    if (!(content.trim() === "")) {
      dispatch(EditMenuItemState({ menuId, content }));
      handleCloseEditModel();
    } else {
      handleCloseEditModel();
    }
  };

  // //*------------------------------------------this function to Add new menu item in the DB

  const addNewMenuItem = async (item) => {
    console.log(item);
    if (!item.trim()) {
      setSnackBarText("add item name !");
      setSnackBarStatus("error");
      setTimeout(() => {
        setOpenSnackbar(true);
      }, 1000);
    } else {
      dispatch(AddMenuState({ item }));
    
      setTimeout(() => {
        setOpenSnackbar(true);
      }, 1000);
    }

    handleCloseAddModel();
  };

  const columns = useMemo(
    () => [
      {
        field: "name",
        headerName: " menu item",
        headerAlign: "center",
        align: "center",
        flex: 1,
      },

      {
        field: "Update item",
        headerName: "Edit",

        renderCell: ({ row }) => {
          return (
            <Box
              sx={{
                width: "70%",
                justifyContent: "space-evenly",
                display: "flex",
              }}
            >
              <Tooltip title="delete">
                <IconButton
                  variant="outlined"
                  onClick={() => {
                    setMenuData({
                      menuId: row.id,
                      active: row.is_deleted,
                    });
                    handleClickOpenConfirmDialog();
                  }}
                  sx={{ color: theme.palette.error.light }}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton
                  onClick={() => {
                    setContent(row?.name);
                    setMenuData({
                      menuId: row.id,
                      active: row.active,
                    });
                    handleShowEditModel();
                  }}
                  sx={{ color: theme.palette.primary.light }}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
            </Box>
          );
        },
        headerAlign: "center",
        align: "center",
        flex: 1,
      },
    ],
    [theme.palette.primary.light, theme.palette.error.light]
  );

  //!-------------------------------------------------------------------------side effect

  useEffect(() => {
    dispatch(GetMenuState());
  }, [dispatch]);

  return (
    <>
      {!menuSelector.isLoading ? (
        <Box
          sx={{
            height: "91vh",
            width: "70%",
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Box
            sx={{
              alignItems: "center",
              height: "auto",
              width: "100%",
              mx: "auto",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" sx={{ ml: 2, mt: 2, mb: 2 }}>
              Branches Menu
            </Typography>
            <Button
              onClick={handleShowAddModel}
              endIcon={<AddIcon />}
              color="primary"
              aria-label="Add note"
              sx={{ mt: 2, mr: 2, mb: 2 }}
            >
              add item
            </Button>
          </Box>

          <DataGrid
            sx={{ width: "100%" }}
            rows={menu}
            columns={columns}
            getRowId={(row) => row?.id}
            loading={menuSelector.menuUpdate}
            {...menuSelector.menu}
            initialState={{
              ...menu?.initialState,
              pagination: { paginationModel: { pageSize: 25 } },
            }}
            pageSizeOptions={[25, 50, 75]}
          />

          <ConfirmedAndEditDialog
            handleCloseDialog={handleCloseConfirmedDialog}
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            fun={deleteCurrentMenuItem}
            itemId={menuData.menuId}
            isDeleted={menuData.active}
            itemName={itemName}
            snackBarText={menuSelector.snackBarMessage}
            snackBarStatus={menuSelector.snackBarStatus}
          />
        </Box>
      ) : (
        <CenteredCircularProgress />
      )}

      <EditModal
        snackBarText={menuSelector.snackBarMessage}
        snackBarStatus={menuSelector.snackBarStatus}
        show={showEditModal}
        setShow={setShowEditModal}
        handleShowModel={handleShowEditModel}
        setModalContent={setContent}
        id={menuData.menuId}
        itemName={itemName}
        fun={updateCurrentMenuItem}
        handleCloseModel={handleCloseEditModel}
        content={content}
        setContent={setContent}
      />

      <AddModal
        snackBarText={menuSelector.snackBarMessage}
        snackBarStatus={menuSelector.snackBarStatus}
        show={showAddModal}
        setShow={setShowAddModal}
        handleShowModel={handleShowAddModel}
        itemName={itemName}
        fun={addNewMenuItem}
        handleCloseModel={handleCloseAddModel}
        content={content}
        setContent={setContent}
      />
       <SimpleSnackbar
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        text={menuSelector.snackBarMessage}
        status={menuSelector.snackBarStatus}
      />
    </>
  );
};

export default Menu;
