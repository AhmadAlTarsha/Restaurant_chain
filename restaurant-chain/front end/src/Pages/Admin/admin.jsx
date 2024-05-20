//!---react import
import React from 'react'
//!mui import
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Box, Icon, IconButton, Typography} from '@mui/material';
import { LockOpenOutlined,AdminPanelSettingsOutlined,SecurityOutlined } from '@mui/icons-material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';

import {useTheme} from '@mui/material'
//!file import
import {rows}  from "./admin-data"
// import {columns} from "./users-dat/"


const Admin = () => {
  const theme=useTheme()

   const columns = [
    { field: 'col1',headerName:"Name",headerAlign:"center",align:"center",flex:1  },
    { field: 'col2',headerName:"userName",headerAlign:"center",align:"center",flex:1   },
    { field: 'col3',headerName:"phone" ,headerAlign:"center",align:"center",flex:1  },
    { field: 'col4',headerName:"governate",headerAlign:"center",align:"center",flex:1  },
      { field: 'col6',headerName:"created at",headerAlign:"center",align:"center",flex:1  },
    { field: 'col7',headerName:"edit" ,headerAlign:"center",align:"center",flex:1 },
    { field: 'col8',headerName:"delete" ,headerAlign:"center",align:"center",flex:1 },
    
    { field: 'col5',headerName:"role",renderCell:({row:{col5}})=>{
      return(
          <Box display="flex" justifyContent="space-evenly" textAlign="center"  sx={{width:"99px", p:"5px",borderRadius:"3px",bgcolor:col5==="admin"? theme.palette.primary.dark:col5==="user"?theme.palette.error.dark: theme.palette.secondary.dark}}>
            {col5==="admin"?<AdminPanelSettingsOutlined sx={{color:"white"}} fontSize='small'/>:col5==="user"?<PersonOutlineOutlinedIcon sx={{color:"white"}} fontSize="small"/>:<ManageAccountsOutlinedIcon sx={{color:"white"}} fontSize='small'/>}
              <Typography  sx={{fontSize:"13px",color:"white"}}>{col5}</Typography> 
          </Box>
      )
    } ,headerAlign:"center",align:"center" ,flex:1},
  
  ];
  return (
 
      <Box  sx={{height:600, width: '100%', mx:"auto", }}>
        <Typography component="h3" variant='Manage Users' sx={{textAlign:"center",py:3}}>Manage Admins</Typography >
      <DataGrid  rows={rows} columns={columns} />
    </Box>
 
  )
}

export default Admin