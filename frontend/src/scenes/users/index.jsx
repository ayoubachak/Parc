import {Box, Button, IconButton, Typography, useTheme} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import {useEffect, useState} from "react";
import {createUserService} from "../../services/services";
import useAuthRequest from "../../hooks/useAuthRequest";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import {useNavigate} from "react-router-dom";
import {getData} from "./data";
import ConfirmDelete from "../../components/ConfirmDeleteDialog";

const splitAndTrim = (text, delimiter) => text.split(delimiter).map(str => str.trim());


const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const authAxios = useAuthRequest();
  const userService = createUserService(authAxios);
    const navigate =  useNavigate();
    const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [deleted, setDeleted] = useState(false)
    const handleDelete = () => {
        setOpenConfirmDeleteDialog(true);
        setDeleted(!deleted)
    };

    const handleEdit = (row) => {
        const userId = row.id;
        navigate("/user/"+userId+"/edit")
    };

    const handleCloseConfirmDeleteDialog = () => {
        setOpenConfirmDeleteDialog(false);
        setSelectedUserId(null);
    };

    const handleConfirmDelete = () => {
        // send the delete request to the server
        console.log(`Deleting user with id: ${selectedUserId}`);
        handleCloseConfirmDeleteDialog();
    };

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleRowClick = (params) => {
        // navigate to /user/{id}
        const id = params.row.id;
        console.log("User Selected", id)
        setSelectedUserId(id)

    }

    useEffect(() => {
        const fetchData = async () =>{
            console.log("Getting users...")
            setIsLoading(true);
            const data = await getData(userService);
            setUsers(data);
            setIsLoading(false);

        }
        fetchData();
    }, [deleted]);


    const columns = [
    {
        field: "id",
        headerName: "ID",
        renderCell:({ row: { id } })=>{
            return <Box onClick={()=>{navigate("/user/"+id+"")}}>
                {id}
            </Box>
        }
    },

    {
      field: "username",
      headerName: "Username",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
        field: "name",
        headerName: "First Name",
        flex: 1,
        cellClassName: "name-column--cell",
    },
    {
        field: "lastname",
        headerName: "Last Name",
        flex: 1,
        cellClassName: "name-column--cell",
    },
    {
        field: "roles",
        headerName: "Roles",
        flex: 1,
        cellClassName: "name-column--cell",
    },
    {
        field: "Created On",
        headerName: "createdOn",
        flex: 1,
        cellClassName: "name-column--cell",
    },
    {
        field: "updatedOn",
        headerName: "Updated On",
        flex: 1,
        cellClassName: "name-column--cell",
    },
    {
        field: "lastloggedOn",
        headerName: "Last Login",
        flex: 1,
        cellClassName: "name-column--cell",
    },
    {
        field: "actions",
        headerName: "Actions",
        flex: 0,
        renderCell: (params) => (
            <Box display="flex" justifyContent="space-between">
                <ConfirmDelete
                    open={openConfirmDeleteDialog}
                    onClose={handleCloseConfirmDeleteDialog}
                    onConfirm={handleConfirmDelete}
                    userId={selectedUserId}
                    onDelete={handleDelete}
                />
                <IconButton onClick={() => handleEdit(params.row)}>
                    <ModeEditOutlineOutlinedIcon />
                </IconButton>
            </Box>
        ),
    },


  ];

  return (
    <Box m="20px">

      <Header title="Users" subtitle="List of All Users" />
          <Box
            m="40px 0 0 0"
            height="66vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
            }}
          >
              <Box
                  m="40px 0 0 0"
                  height="7vh"
              >
                  <Button variant="contained" color="secondary" onClick ={()=>{ navigate('/user/add')}}>
                      Add
                  </Button>
                  <Button variant="contained" color="primary">
                      Delete Selected
                  </Button>
              </Box>
          {isLoading ? <p>Loading...</p> :<>
            <DataGrid
                checkboxSelection
                rows={users}
                columns={columns}
                onRowClick={handleRowClick}


            />
          </>
          }
          </Box>
    </Box>
  );
};

export default Users;
