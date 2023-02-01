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

import {tokens} from "../../theme";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import EmployeeBox from "../../components/EmployeeBox";
import VehicleBox from "../../components/VehicleBox";



const Mission = ()=>{
    let { id } = useParams();
    const [mission, setMission] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [missionVehicles, setMissionVehicles ] = useState([]);
    const [isMissionVehiclesLoading, setIsMissionVehiclesLoading] = useState(true);
    const authAxios = useAuthRequest();
    const missionService = createMissionOrderService(authAxios);
    const vehicleService = createVehicleService(authAxios);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [deleted, setDeleted] = useState(false);
    const navigate = useNavigate()
    const [deletedNotification, setDeletedNotification ]= useState("")



    useEffect(() => {
        const fetchData = async () =>{
            setIsLoading(true);
            const response = await missionService.getById(id)
            if(response.data?.id){
                setMission(response.data)
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);


    useEffect(()=>{
        const deleteMission =async ()=>{
            if(deleted){
                const response = await missionService.delete(mission.id);
                if(response.status === 204){
                    console.log("Deleted")

                    setDeletedNotification(
                        <Alert severity="info">
                            <AlertTitle>Info</AlertTitle>
                            Mission {mission.missionSubject} ({mission.id}) — <strong>Was Deleted</strong>
                        </Alert>
                    )
                    setTimeout(()=>{
                        navigate("/missions")
                    },1000)
                }
            }
        }
        deleteMission()
    },[deleted])

    // this should handle getting the vehicles
    useEffect(()=>{
        const fetchData = async () =>{
            setIsMissionVehiclesLoading(true);
            const response = await vehicleService.getVehiclesByMissionId(id)
            if(response.data){
                setMissionVehicles(response.data)
                setIsMissionVehiclesLoading(false);
            }
        }
        fetchData();
    },[])

    return <div> { isLoading ? <p>Loading...</p> :
        <>
            {deletedNotification}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Box mb={10}>
                                <Grid container spacing={3} >
                                    <Grid item xs={6} >
                                    <Grid container direction="column" spacing={3} alignItems="center" justifyContent="center">
                                        <Grid item xs={12}>
                                            <Typography variant="h2" style={{fontWeight:900, margin:"10px 0 0 10"}}>{mission.missionSubject}</Typography>
                                            <Typography variant="h4" style={{ margin:"10px 0 0 10"}}>{mission.type}</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button variant="contained" color="primary" onClick={()=>{navigate("/mission/"+mission.id+"/edit")}}>
                                                Edit
                                            </Button>
                                            <Button variant="contained" color="secondary" onClick={()=>{setDeleted(true);console.log(deleted)}}>
                                                Delete
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                    <Grid item xs={6}>
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
                                                            Start Date
                                                        </TableCell>
                                                        <TableCell align="right">{mission.startDate}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell component="th" scope="row">
                                                            End Date
                                                        </TableCell>
                                                        <TableCell align="right">{mission.endDate}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell component="th" scope="row">
                                                            Path
                                                        </TableCell>
                                                        <TableCell align="right">{mission.path}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <div style={{height: '300px', overflowY: 'scroll'}}>
                                        <h3>Primary Employee</h3>
                                        <EmployeeBox employee={mission.employee} />
                                        <h3>Replacement Employee</h3>
                                        <EmployeeBox employee={mission.remplacementEmployee} />
                                        { mission.employees.length > 0?<>
                                            <h4>Other Employees</h4>
                                            {mission.employees.map((employee)=>{
                                                return <EmployeeBox employee={employee} />
                                            })}
                                        </> :""}
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    {isMissionVehiclesLoading? <p>Loading...</p>:<>

                                    { missionVehicles.length > 0? <div style={{height: '300px', overflowY: 'scroll'}}>
                                            <h3>Vehicles</h3>
                                            {missionVehicles.map((vehicle)=>{
                                                return <VehicleBox vehicle={vehicle} />
                                            })}
                                        </div>
                                        : <p>No vehicles on this mission</p>
                                    }
                                    </>
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
export default Mission;