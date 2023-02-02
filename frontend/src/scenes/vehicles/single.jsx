import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {createEmployeeService, createMissionOrderService, createVehicleService} from "../../services/services";
import useAuthRequest from "../../hooks/useAuthRequest";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    IconButton,
    TableCell,
    TableContainer, TableHead, TableRow, Table, TableBody,
    Typography,
    useTheme, Paper
} from "@mui/material";
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import {tokens} from "../../theme";
import getData from "../order_missions/data";
import {getDataForId, vehicleMapping} from "./data";
import Missions from "../order_missions";
import {DataGrid} from "@mui/x-data-grid";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const Vehicle = ()=>{
    let { id } = useParams();
    const [vehicle, setVehicle] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [missions, setMissions] = useState([]);
    const [missionsLoading, setMissionsLoading] = useState(true);

    const authAxios = useAuthRequest('http://localhost:8080/');
    const vehicleService = createVehicleService(authAxios);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [deleted, setDeleted] = useState(false);
    const navigate = useNavigate()
    const [deletedNotification, setDeletedNotification ]= useState("")
    useEffect(() => {
        const fetchData = async () =>{
            setIsLoading(true);
            const response = await vehicleService.getById(id)

            if(response.data?.id){
                setVehicle(vehicleMapping([response.data]).pop())
                setMissions(response.data.orderMissions)
                setIsLoading(false);
                setMissionsLoading(false);
            }
        }
        fetchData();
    }, []);


    useEffect(()=>{
        const deleteVehicle =async ()=>{
            if(deleted){
                const response = await vehicleService.delete(vehicle.id);
                if(response.status === 204){
                    console.log("Deleted")

                    setDeletedNotification(
                    <Alert severity="info">
                        <AlertTitle>Info</AlertTitle>
                        Vehicle {vehicle.name} ({vehicle.id}) — <strong>Was Deleted</strong>
                    </Alert>
                    )
                    setTimeout(()=>{
                        navigate("/vehicles")
                    },1000)
                }
            }
        }
        deleteVehicle()
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
            field: "vehicle",
            headerName: "Primary Vehicle",
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
            field: "remplacementVehicle",
            headerName: "Replacement Vehicle",
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
                                <Grid item xs={3} >
                                    <Grid container direction="column" spacing={3} alignItems="center" justifyContent="center">
                                        <Grid item xs={12}>
                                            <Avatar src={vehicle.avatar ? vehicle.avatar : '../../assets/user.png'} style={{ width: '250px', height: '250px' }} />
                                        </Grid>
                                        <Grid item xs={12} display={"flex"} justifyContent={"center"} gap={"5px"}>
                                            <Button variant="contained" color="primary" onClick={()=>{navigate("/vehicle/"+vehicle.id+"/edit")}}>
                                                Edit
                                            </Button>
                                            <Button variant="contained" color="secondary" onClick={()=>{setDeleted(true);console.log(deleted)}}>
                                                Delete
                                            </Button>
                                            <Grid item>
                                                <Button variant="contained" color="secondary"
                                                        onClick={()=>{console.log(vehicle);navigate("/mission/add", {state : {vehicle}})}}
                                                >
                                                    Send On Mission
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3}>
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Attribute</TableCell>
                                                    <TableCell align="right">Value</TableCell>
                                                </TableRow>
                                            </TableHead>

                                            <TableBody>
                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        Brand and Model
                                                    </TableCell>
                                                    <TableCell align="right">{vehicle.brand} {vehicle.brandmodel} ({vehicle.liscence})</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        Color
                                                    </TableCell>
                                                    <TableCell align="right">{vehicle.color}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        Category
                                                    </TableCell>
                                                    <TableCell align="right">{vehicle.category}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        Number of Chairs
                                                    </TableCell>
                                                    <TableCell align="right">{vehicle.numchairs}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        Power
                                                    </TableCell>
                                                    <TableCell align="right">{vehicle.power} HP</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        Distance Traveled
                                                    </TableCell>
                                                    <TableCell align="right">{vehicle.vehkm}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        Fuel Type
                                                    </TableCell>
                                                    <TableCell align="right">{vehicle.fuelType}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        Service
                                                    </TableCell>
                                                    <TableCell align="right">{vehicle.service}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        Reparations
                                                    </TableCell>
                                                    <TableCell align="right">{vehicle.reparation}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                <Grid items xs={6} style={{padding:"10px"}}>
                                    <Grid container spacing={12}>
                                        <Grid item>
                                            <Typography variant="h1" style={{fontWeight:900, margin:"10px 0 0 10"}}>Missions</Typography>
                                            <Typography variant="subtitle1" style={{ margin:"10px 0 0 10"}}>All Missions This Vehicle have been on:</Typography>
                                        </Grid>

                                    </Grid>
                                    <Grid container spacing={12}>
                                        <Grid item xs={12}>
                                            { missionsLoading ?<p>Loading...</p>:
                                                <Box
                                                    m="40px 0 0 0"
                                                    height="65vh"
                                                    sx={{
                                                        overflowX: "auto",
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
export default Vehicle;