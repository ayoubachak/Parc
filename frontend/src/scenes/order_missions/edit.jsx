import {useLocation, useNavigate, useParams} from "react-router-dom";
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
    useTheme, Paper, TextField, Stack
} from "@mui/material";

import {tokens} from "../../theme";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import EmployeeBox from "../../components/EmployeeBox";
import VehicleBox from "../../components/VehicleBox";
import {EmployeeTag, MultipleEmployeeTag} from "../../components/EmployeeLiveSearch";
import {VehicleTag} from "../../components/VehicleLiveSearch";



const MissionEdit = (props)=>{

    let { id } = useParams();

    const [mission, setMission] = useState({});
    const [isLoading, setIsLoading] = useState(false)

    const authAxios = useAuthRequest();
    const missionService = createMissionOrderService(authAxios);
    const vehicleService = createVehicleService(authAxios);
    const theme = useTheme();
    const navigate = useNavigate()
    const [successnotification, setSuccessNotification] = useState("");
    const [errornotification, setErrorNotification] = useState("");

    const [missionSubject, setMissionSubject] = useState("");
    const [type, setType] = useState("");
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate ] = useState(null)
    const [path, setPath] = useState("")
    const [primaryEmployee, setPrimaryEmployee ] = useState(null);
    const [replacementEmployee, setReplacementEmployee] = useState(null);
    const [otherEmployees, setOtherEmployees] = useState([])

    const [missionVehicles, setMissionVehicles ] = useState([]);
    const [isMissionVehiclesLoading, setIsMissionVehiclesLoading] = useState(true);

    const [vehicle, setVehicle] = useState(null)

    const [saved, setSaved] = useState(false)

    // this should handle getting the vehicles
    useEffect(()=>{
        const fetchData = async () =>{
            setIsMissionVehiclesLoading(true);
            const response = await vehicleService.getVehiclesByMissionId(id)
            if(response.data){
                setMissionVehicles(response.data)
                if(response.data.length > 0){
                    // currently we're only using 1 vehicle
                    setVehicle(response.data[0])
                    console.log(response.data[0])
                }
                setIsMissionVehiclesLoading(false);
            }
        }
        fetchData();
    },[])

    // this should handle getting the mission and setting the values
    useEffect(() => {
        const fetchData = async () =>{
            setIsLoading(true);
            const response = await missionService.getById(id)
            console.log(response.data)
            if(response.data?.id){
                const data = response.data;
                setPrimaryEmployee(data.employee);
                setReplacementEmployee(data.remplacementEmployee);
                setOtherEmployees(data.employees);
                console.log("start date ", data.startDate.toString())
                console.log("end date ", data.endDate.toString())
                setStartDate(data.startDate.toString().slice(0, 10));
                setEndDate(data.endDate.toString().slice(0, 10));
                setPath(data.path);
                setMissionSubject(data.missionSubject);
                setType(data.type);
                setIsLoading(false);

            }
        }
        fetchData();
    }, []);

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

    // this will handle saving the mission
    useEffect(() => {
        const editMission = async ()=>{
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
                console.log("Saving the mission")
                console.log(mission)
                const response = await missionService.edit(id, mission);
                if(response.status === 200){
                    handleSuccessNotification("Mission Saved Successfully")
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
        editMission()
    }, [saved])

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
        setSaved(true)
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
                                        <h1>Editting Mission : {missionSubject} </h1>
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
                                                Save
                                            </Button>
                                            <Button variant="contained" color="secondary" onClick={()=>navigate("/missions")}>
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
export default MissionEdit;