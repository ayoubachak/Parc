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
    useTheme, Paper, TextField, Stack
} from "@mui/material";

import {tokens} from "../../theme";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import EmployeeBox from "../../components/EmployeeBox";
import VehicleBox from "../../components/VehicleBox";
import {EmployeeTag} from "../../components/EmployeeLiveSearch";



const MissionAdd = (props)=>{
    const [mission, setMission] = useState({});
    const [isLoading, setIsLoading] = useState(false)

    const authAxios = useAuthRequest();
    const missionService = createMissionOrderService(authAxios);
    const vehicleService = createVehicleService(authAxios);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate()
    const [successnotification, setSuccessNotification] = useState("");
    const [errornotification, setErrorNotification] = useState("");

    const [primaryEmployee, setPrimaryEmployee ] = useState(null);
    const [replacementEmployee, setReplacementEmployee] = useState(null);
    const [otherEmployees, setOtherEmployees] = useState([])

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



    const borderStyle= {
        border: '1px solid #9A9797FF',
        borderRadius: 5,
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        height:"50%"
    }

    return <div> { isLoading ? <p>Loading...</p> :
        <>
            <Stack sx={{ width: '100%' }} spacing={2}>
                {successnotification}
                {errornotification}
            </Stack>
            <div style={{height: '100%', overflowY: 'scroll'}}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Box style={{height:"280px"}}>
                                <Grid container spacing={3} >
                                    <Grid item xs={6} >
                                        <Grid container direction="column" spacing={3} alignItems="center" justifyContent="center" style={borderStyle}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Mission Subject"
                                                    variant="outlined"
                                                    style={{ fontWeight: 900, margin: "10px 0 0 10" }}
                                                />
                                                <TextField
                                                    label="Type"
                                                    variant="outlined"
                                                    style={{ margin: "10px 0 0 10" }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
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
                                                            Start Date
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <TextField
                                                                type="date"
                                                                // defaultValue={mission.startDate}
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
                                                                // defaultValue={mission.endDate}
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
                                                                // defaultValue={mission.path}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <div style={{ overflowY: 'scroll'}}>
                                        <h3>Primary Employee</h3>
                                        <EmployeeTag employee={primaryEmployee} setEmployee={setPrimaryEmployee}/>
                                        <h3>Replacement Employee</h3>
                                        <EmployeeTag employee={replacementEmployee} setEmployee={setReplacementEmployee}/>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div style={{ overflowY: 'scroll'}}>
                                        <h3>Vehicles</h3>

                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} marginTop={"10px"}>
                                <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}  alighItems={"right"}>
                                    <Button variant="contained" color="primary">
                                        Save
                                    </Button>
                                    <Button variant="contained" color="secondary">
                                        Back
                                    </Button>
                                </Grid>
                            </Grid>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            </div>
        </>
    }
    </div>
}
export default MissionAdd;