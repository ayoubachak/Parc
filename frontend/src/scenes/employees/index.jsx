import {Box, IconButton, Typography, useTheme} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import {useEffect, useState} from "react";
import {createEmployeeService} from "../../services/services";
import useAuthRequest from "../../hooks/useAuthRequest";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import {useNavigate} from "react-router-dom";
import {getData} from "./data";

const Employees = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const authAxios = useAuthRequest('http://localhost:8080/');
  const employeeService = createEmployeeService(authAxios);
    const navigate =  useNavigate();

    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleRowClick = (params) => {
        // navigate to /employee/{id}
        const id = params.row.id;
        navigate("/employee/"+id);
    }

    useEffect(() => {
        const fetchData = async () =>{
            setIsLoading(true);
            const data = await getData(employeeService);
            setEmployees(data);
            setIsLoading(false);

        }
        fetchData();
    }, []);

    const handleDelete = (row)=>{
        console.log("deleting..")
        console.log(row)
    }
    const handleEdit = (row)=>{
        console.log("editing..")
        console.log(row)
    }

    const columns = [
    { field: "id", headerName: "ID" },

    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
        field: "service",
        headerName: "Service",
        flex: 1,
        cellClassName: "name-column--cell",
    },
    {
        field: "func",
        headerName: "Function",
        flex: 1,
        renderCell: ({ row: { func } }) => {
            return (
                <Box
                    width="60%"
                    m="0 auto"
                    p="5px"
                    display="flex"
                    justifyContent="center"
                    backgroundColor={
                        func === "Manager"
                            ? colors.greenAccent[600]
                            : func === "Driver"
                                ? colors.greenAccent[700]
                                : colors.greenAccent[700]
                    }
                    borderRadius="4px"
                >
                    {func === "Manager" && <AdminPanelSettingsOutlinedIcon />}
                    {func === "Driver" && <DirectionsCarOutlinedIcon />}
                    {func === "Admin" && <LockOpenOutlinedIcon />}
                    <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                        {func}
                    </Typography>
                </Box>
            );
        },
    },
    {
        field: "actions",
        headerName: "Actions",
        flex: 0,
        renderCell: (params) => (
            <Box display="flex" justifyContent="space-between">
                <IconButton onClick={() => handleDelete(params.row)}>
                    <RemoveOutlinedIcon />
                </IconButton>
                <IconButton onClick={() => handleEdit(params.row)}>
                    <ModeEditOutlineOutlinedIcon />
                </IconButton>
            </Box>
        ),
    },


  ];

  return (
    <Box m="20px">

      <Header title="Employees" subtitle="List of All Employees" />
          <Box
            m="40px 0 0 0"
            height="75vh"
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
          {isLoading ? <p>Loading...</p> :<>
            <DataGrid
                checkboxSelection
                rows={employees}
                columns={columns}
                onRowClick={handleRowClick}

            />
          </>
          }
          </Box>
    </Box>
  );
};

export default Employees;
