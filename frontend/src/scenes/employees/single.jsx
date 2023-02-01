import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {createEmployeeService, createMissionOrderService} from "../../services/services";
import useAuthRequest from "../../hooks/useAuthRequest";
import {Avatar, Box, Button, Card, CardContent, Grid, IconButton, Typography, useTheme} from "@mui/material";
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import {tokens} from "../../theme";
import getData from "../order_missions/data";
import {getDataForId} from "./data";
import Missions from "../order_missions";
import {DataGrid} from "@mui/x-data-grid";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const uc = (s)=>{
    return s.toUpperCase()
}

const mapEmployeeFunctionToBox = (func, colors) =>{

    return <Box
        width="10%"
        m="10px 10px 10px 0px"
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
}

const Employee = ()=>{
    let { id } = useParams();
    const [employee, setEmployee] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [missions, setMissions] = useState([]);
    const [missionsLoading, setMissionsLoading] = useState(true);

    const authAxios = useAuthRequest('http://localhost:8080/');
    const employeeService = createEmployeeService(authAxios);
    const missionOrderService = createMissionOrderService(authAxios);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [deleted, setDeleted] = useState(false);
    const navigate = useNavigate()
    const [deletedNotification, setDeletedNotification ]= useState("")
    useEffect(() => {
        const fetchData = async () =>{
            setIsLoading(true);
            const response = await employeeService.getById(id)
            setEmployee(response.data)
            setIsLoading(false);
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () =>{
            setMissionsLoading(true);
            const data = await getDataForId(missionOrderService, id)
            setMissions(data);
            setMissionsLoading(false);
        }
        fetchData();
    }, []);

    useEffect(()=>{
        const deleteEmployee =async ()=>{
            if(deleted){
                const response = await employeeService.delete(employee.id);
                if(response.status === 204){
                    console.log("Deleted")

                    setDeletedNotification(
                    <Alert severity="info">
                        <AlertTitle>Info</AlertTitle>
                        Employee {employee.name} ({employee.id}) — <strong>Was Deleted</strong>
                    </Alert>
                    )
                    setTimeout(()=>{
                        navigate("/employees")
                    },1000)
                }
            }
        }
        deleteEmployee()
    },[deleted])

    const columns = [
        { field: "id", headerName: "ID" },
        {
            field: "startDate",
            headerName: "Start Date",
            flex: 1,
        },
        {
            field: "endDate",
            headerName: "End Date",
            flex: 1,
        },
        {
            field: "employee",
            headerName: "Primary Employee",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "missionSubject",
            headerName: "Mission Subject",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "remplacementEmployee",
            headerName: "Replacement Employee",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "type",
            headerName: "Type",
            flex: 1,
            cellClassName: "name-column--cell",
        },

    ];

    return <div> { isLoading ? <p>Loading...</p> :
        <>
        {deletedNotification}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={3}>
                                    <Avatar src={employee.avatar ? employee.avatar : '../../assets/user.png'} style={{ width: '100px', height: '100px' }} />
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="h2" style={{fontWeight:600}}>{employee.name} ({employee.id})</Typography>
                                    <Typography variant="h4" style={{fontWeight:300}}>{employee.email}</Typography>
                                    <Typography variant="div" style={{display:"flex", justifyContent:"flex-start"}}>{mapEmployeeFunctionToBox(employee.function, colors)}</Typography>
                                    <Typography variant="h5">{uc(employee.service.name)}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <Button variant="contained" color="primary" onClick={()=>{navigate("/employee/"+employee.id+"/edit")}}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={()=>{setDeleted(true);console.log(deleted)}}>
                                        Delete
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>

                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={12}>
                                <Grid item>
                                    <Typography variant="h1" style={{fontWeight:900, margin:"10px 0 0 10"}}>Missions</Typography>
                                    <Typography variant="subtitle1" style={{ margin:"10px 0 0 10"}}>All Missions as a primary Employee for <b>{employee.name} ({employee.id})</b></Typography>
                                </Grid>

                            </Grid>
                            <Grid container spacing={12}>
                                <Grid item xs={12}>
                                    { missionsLoading ?<p>Loading...</p>:
                                        <Box
                                        m="40px 0 0 0"
                                        height="40vh"
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
                                    <DataGrid checkboxSelection rows={missions} columns={columns} />
                                    </Box>
                                    }
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    }
    </div>
}
export default Employee;