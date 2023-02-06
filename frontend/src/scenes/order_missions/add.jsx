import {useLocation, useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import { createMissionOrderService } from "../../services/services";
import useAuthRequest from "../../hooks/useAuthRequest";
import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    TableCell,
    TableContainer, TableHead, TableRow, Table, TableBody,
    useTheme, Paper, TextField, Stack
} from "@mui/material";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {EmployeeTag, MultipleEmployeeTag} from "../../components/EmployeeLiveSearch";
import {VehicleTag} from "../../components/VehicleLiveSearch";



const MissionAdd = (props)=>{

    const { state } = useLocation();
    const emp = state?.employee || null;
    const veh = state?.vehicle || null;

    const [mission, setMission] = useState({});
    const [isLoading, setIsLoading] = useState(false)

    const authAxios = useAuthRequest();
    const missionService = createMissionOrderService(authAxios);
    const theme = useTheme();
    const navigate = useNavigate()
    const [successnotification, setSuccessNotification] = useState("");
    const [errornotification, setErrorNotification] = useState("");

    const [missionSubject, setMissionSubject] = useState("");
    const [type, setType] = useState("");
    const defaultDate = new Date();
    const [startDate, setStartDate] = useState(defaultDate.toISOString().slice(0, 10))
    const [endDate, setEndDate ] = useState("")
    const [path, setPath] = useState("")
    const [primaryEmployee, setPrimaryEmployee ] = useState(emp);
    const [replacementEmployee, setReplacementEmployee] = useState(null);
    const [otherEmployees, setOtherEmployees] = useState([])

    const [vehicle, setVehicle] = useState(veh)
    const [added, setAdded] = useState(false);

    // Function to handle the error, set the error message
    const handleSuccessNotification = (message) => {
        setSuccessNotification(
            <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                {message}
            </Alert>
        );
    };
    const handleErrorNotification = (message) => {
        setErrorNotification(
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {message}
            </Alert>
        );
    };

    useEffect(() => {
        const addMission = async ()=>{
            if (
                mission.missionSubject &&
                mission.type &&
                mission.startDate &&
                mission.endDate &&
                mission.path &&
                mission.employee &&
                mission.remplacementEmployee &&
                mission.employees
            ) {
                console.log("Adding the mission")
                const response = await missionService.addOne(mission);
                if(response.status === 200){
                    handleSuccessNotification("Employee Added Successfully")
                    setTimeout(()=>{
                        navigate("/mission/"+response.data.id)
                    }, 500)
                }else if (response.status === 401){
                    handleErrorNotification("Your session is expired, please login again!")
                    setTimeout(()=>{
                        navigate("/login")
                        window.location.reload()
                    }, 500)
                }else{
                    handleErrorNotification("Something went Wrong!")
                }
            }
        };
        addMission()
    }, [added])

    const handleSubmit = (e)=>{
        e.preventDefault()
        setMission({
            missionSubject:missionSubject,
            type:type,
            startDate:startDate, //.toString()+"T00:00:00",
            endDate:endDate, //.toString()+"T00:00:00",
            path:path,
            employee:primaryEmployee,
            remplacementEmployee:replacementEmployee,
            employees:otherEmployees,
            vehicle:vehicle
        })
        setAdded(true)
        console.log(mission)
    }

    const borderStyle= {
        border: '1px solid #9A9797FF',
        borderRadius: 5,
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        height:"350px"
    }

    const handlePrimaryEmployeeSelection = (employee) => {
        setPrimaryEmployee(employee);
    };
    const handleReplacementEmployeeSelection = (employee) => {
        setReplacementEmployee(employee);
    };
    const handleOtherEmployeeSelection = (employees) => {
        setOtherEmployees(employees);
    };
    const handleVehicleSelection = (vehicle)=>{
        setVehicle(vehicle);
    }

    return <div> { isLoading ? <p>Loading...</p> :
        <>
            <Stack sx={{ width: '100%' }} spacing={2}>
                {successnotification}
                {errornotification}
            </Stack>
            <div style={{height: '100%'}}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit}>
                    <Card>
                        <CardContent>
                            <Box style={{}} >
                                <h1>New Mission ? </h1>
                                <Grid container spacing={3} style={{height:"400px"}}>
                                    <Grid item xs={4}>
                                        <TableContainer component={Paper} style={borderStyle}>
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
                                                            Mission Subject
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <TextField
                                                                label="Mission Subject"
                                                                variant="outlined"
                                                                defaultValue={missionSubject}
                                                                onChange={(event)=> setMissionSubject(event.target.value)}
                                                                style={{ fontWeight: 900, margin: "10px 0 0 10" }}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell component="th" scope="row">
                                                            Type
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <TextField
                                                                label="Type"
                                                                defaultValue={type}
                                                                onChange={(event)=>setType(event.target.value)}
                                                                variant="outlined"
                                                                style={{ margin: "10px 0 0 10" }}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell component="th" scope="row">
                                                            Start Date
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <TextField
                                                                type="date"
                                                                defaultValue={startDate}
                                                                onChange={(event)=>setStartDate(event.target.value)}
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell component="th" scope="row">
                                                            End Date
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <TextField
                                                                type="date"
                                                                defaultValue={endDate}
                                                                onChange={(event)=>setEndDate(event.target.value)}
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell component="th" scope="row">
                                                            Path
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <TextField
                                                                defaultValue={path}
                                                                onChange={(event)=>setPath(event.target.value)}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div style={{ overflowY: 'scroll', height:"350px"}}>
                                            <h3>Primary Employee</h3>
                                            <EmployeeTag employee={primaryEmployee} handleEmployeeSelection={handlePrimaryEmployeeSelection}/>
                                            <h3>Replacement Employee</h3>
                                            <EmployeeTag employee={replacementEmployee} handleEmployeeSelection={handleReplacementEmployeeSelection}/>
                                            {primaryEmployee !== null && replacementEmployee !== null ?
                                                <>
                                                    <h3>Add More:</h3>
                                                    <MultipleEmployeeTag employees={otherEmployees} handleEmployeesSelection={handleOtherEmployeeSelection}/>
                                                </>
                                                :""}
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div style={{ overflowY: 'scroll', height:"350px"}}>
                                            <h3>Add Vehicles</h3>
                                            <VehicleTag vehicle={vehicle} handleVehicleSelection={handleVehicleSelection}/>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Grid container spacing={3}>

                            </Grid>
                            <Grid container spacing={3} marginTop={"10px"}>
                                <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}  alighItems={"right"}>
                                    <Button type="submit" variant="contained" color="primary">
                                        Add
                                    </Button>
                                    <Button variant="contained" color="secondary">
                                        Back
                                    </Button>
                                </Grid>
                            </Grid>

                        </CardContent>
                    </Card>
                    </form>
                </Grid>
            </Grid>
            </div>
        </>
    }
    </div>
}
export default MissionAdd;