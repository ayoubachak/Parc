import {
    Avatar, Button,
    Card,
    CardContent,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField, useTheme
} from "@mui/material";
import {tokens} from "../../theme";
import useAuthRequest from "../../hooks/useAuthRequest";
import {createVehicleService, createServiceService} from "../../services/services";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";


const VehicleEdit = ()=>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const authAxios = useAuthRequest();
    const vehicleService = createVehicleService(authAxios);
    const servicesService = createServiceService(authAxios);
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState("");
    const [func, setFunction] = useState("");
    const [service, setService] = useState("");
    const [services, setServices] = useState([]);
    const [vehicle, setVehicle] = useState({});
    const [successnotification, setSuccessNotification] = useState("");
    const [errornotification, setErrorNotification] = useState("");
    const { id } = useParams();
    const [saved, setSaved] = useState(false)

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

    const navigate = useNavigate();
    const lookupServiceNameById = (id) => {
        const selectedService = services.find((service) => service.id === id);
        return selectedService ? selectedService.name : '';
    }

    useEffect(() => {
        const fetchData =async ()=>{
            const response = await servicesService.all();
            setServices(response.data)
            setIsLoading(false)
        }
        fetchData()
    }, []);

    // getting the vehicle by the id
    useEffect(() => {
        const fetchData = async () =>{
            const response = await vehicleService.getById(id)
            setVehicle(response.data)
            setName(response.data.name)
            setFunction(response.data["function"])
            setService(response.data.service)
            console.log(vehicle)
            console.log(vehicle.name)
            console.log(vehicle.function)
            console.log(vehicle.service)
        }
        fetchData();
    }, [isLoading]);


    useEffect(() => {
        const saveVehicle = async ()=>{
            if (vehicle.name && vehicle.function && vehicle.service && saved) {
                console.log("Saving the vehicle")
                console.log(vehicle)

                const response = await vehicleService.edit(id,vehicle);
                if(response.status === 200){
                    handleSuccessNotification("Vehicle Saved Successfully")
                    setTimeout(()=>{
                        navigate("/vehicle/"+id)
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
        saveVehicle()
    }, [saved])
    const handleSubmit = (event) => {
        event.preventDefault();
        setVehicle({
            name: name,
            function: func,
            service: service,
        });
        setSaved(!saved)
    };
    return <div> { isLoading ? <p>Loading...</p> :
        <>
            <Stack sx={{ width: '100%' }} spacing={2}>
                {successnotification}
                {errornotification}
            </Stack>
            <Grid container spacing={3} direction="column" alignItems="left">
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={3} direction="row">
                                    <Grid item xs={3} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Avatar src={'../../assets/user.png'} style={{ width: '150px', height: '150px' }} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grid container direction="column" spacing={3}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Name"
                                                    value={name}
                                                    onChange={(event) => setName(event.target.value)}
                                                    variant="outlined"
                                                    required
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Function"
                                                    value={func}
                                                    onChange={(event) => setFunction(event.target.value)}
                                                    variant="outlined"
                                                    required
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormControl variant="outlined">
                                                    <InputLabel id="service-select-label">Select Service</InputLabel>
                                                    <Select
                                                        required
                                                        labelId="service-select-label"
                                                        value={service && service.id ? service.id : ""}
                                                        style={{ minWidth: "150px" }}
                                                        onChange={(event) => setService({id: event.target.value, name:lookupServiceNameById(event.target.value) || ""})}
                                                    >
                                                        <MenuItem value="" disabled>Select Service</MenuItem>
                                                        {services.map((serviceOption) => (
                                                            <MenuItem key={serviceOption.id} value={serviceOption.id}>
                                                                {serviceOption.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>

                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid container spacing={3} direction="row" justify="space-between">
                                                    <Grid item>
                                                        <Button type="submit" variant="contained" color="primary">
                                                            Save
                                                        </Button>
                                                    </Grid>
                                                    <Grid item>
                                                        <Button variant="contained" color="primary"
                                                                onClick={()=>{navigate("/vehicles")}}
                                                        >
                                                            Back
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </>
    }
    </div>
}

export default VehicleEdit;
