import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    createConsumptionService,
    createEmployeeService,
    createFuelCompanyService,
    createMissionOrderService,
    createVehicleService
} from "../../services/services";
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



const Consumption = ()=>{
    let { id } = useParams();

    const [isLoading, setIsLoading] = useState(true);

    const [consumption, setConsumption] = useState({});
    const authAxios = useAuthRequest();

    const consumptionService = createConsumptionService(authAxios)
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [deleted, setDeleted] = useState(false);
    const navigate = useNavigate()
    const [deletedNotification, setDeletedNotification ]= useState("")



    useEffect(() => {
        const fetchData = async () =>{
            setIsLoading(true);
            const response = await consumptionService.getById(id)
            console.log(response.data)
            if(response.data?.id){
                const data = response.data;
                // setFuelCompany(data.fuelCompany);
                // setDate(data.date.toString().slice(0, 10));
                // setDistance(data.distance);
                // setPrice(data.price);
                // setVolume(data.volume);
                setIsLoading(false);
                setConsumption(data);

            }
        }
        fetchData();
    }, []);

    useEffect(()=>{
        const deleteConsumption =async ()=>{
            if(deleted){
                const response = await consumptionService.delete(consumption.id);
                if(response.status === 204){
                    console.log("Deleted")

                    setDeletedNotification(
                        <Alert severity="info">
                            <AlertTitle>Info</AlertTitle>
                            Consumption ({consumption.id}) — <strong>Was Deleted</strong>
                        </Alert>
                    )
                    setTimeout(()=>{
                        navigate("/consumptions")
                    },1000)
                }
            }
        }
        deleteConsumption()
    },[deleted])


    const borderStyle= {
        border: '1px solid #9A9797FF',
        borderRadius: 5,
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        height:"100%"
    }

    return <div> { isLoading ? <p>Loading...</p> :
        <>
        {deletedNotification}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Box mb={10}>
                                <Grid container spacing={3} >
                                    <Grid item xs={3}></Grid>
                                    <Grid item xs={6}>
                                        <TableContainer component={Paper}  style={borderStyle}>
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
                                                            Date
                                                        </TableCell>
                                                        <TableCell align="right">{consumption.date}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell component="th" scope="row">
                                                            Distance
                                                        </TableCell>
                                                        <TableCell align="right">{consumption.distance}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell component="th" scope="row">
                                                            Price
                                                        </TableCell>
                                                        <TableCell align="right">{consumption.price}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell component="th" scope="row">
                                                            Volume
                                                        </TableCell>
                                                        <TableCell align="right">{consumption.volume}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell component="th" scope="row">
                                                            Fuel Company
                                                        </TableCell>
                                                        <TableCell align="right">{consumption.fuelCompany.name}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <Grid container direction="column" spacing={3} alignItems="center" justifyContent="center" >

                                            <Grid item xs={12}>
                                                <Button variant="contained" color="primary" onClick={()=>{navigate("/consumption/"+consumption.id+"/edit")}}>
                                                    Edit
                                                </Button>
                                                <Button variant="contained" color="secondary" onClick={()=>{setDeleted(true);console.log(deleted)}}>
                                                    Delete
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    }
    </div>
}
export default Consumption;