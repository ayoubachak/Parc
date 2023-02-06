import {
    Select,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Card, CardContent, Grid, Button, Stack,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import useAuthRequest from "../../hooks/useAuthRequest";
import {


    createFuelCompanyService,
    createConsumptionService
} from "../../services/services";
import {useNavigate, useParams} from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';



const ConsumptionEdit = (props)=>{
    let { id } = useParams();
    const authAxios = useAuthRequest();

    const fuelCompanyService = createFuelCompanyService(authAxios)
    const consumptionService = createConsumptionService(authAxios)

    const [isLoading, setIsLoading] = useState(true);
    // variable define the attributes of the vehicule object...


    // variables we'll get from the endpoints...


    const [brands, setBrands] = useState([]);

    const [price, setPrice] = useState('');
    const [volume, setVolume] = useState('');
    const [distance, setDistance] = useState('');
    const [date, setDate] = useState('');
    const [fuelCompany, setFuelCompany] = useState({});
    const [fuelcompanies,setFuelCompanies] = useState([]);
    const [consumption, setConsumption] = useState({});
    const [deletedNotification, setDeletedNotification ]= useState("")



    const [successnotification, setSuccessNotification] = useState("");
    const [errornotification, setErrorNotification] = useState("");


    useEffect(() => {
        const fetchData = async () =>{
            setIsLoading(true);
            const response = await consumptionService.getById(id)
            console.log(response.data)
            if(response.data?.id){
                const data = response.data;
                setFuelCompany(data.fuelCompany);
                setDate(data.date.toString().slice(0, 10));
                setDistance(data.distance);
                setPrice(data.price);
                setVolume(data.volume);
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
    // the one and only useNavigate
    const navigate = useNavigate();

    const lookupFuelCompanyNameById = (id) => {
        const selectedFuelCompany = fuelcompanies.find((fuelCompany) => fuelCompany.id === id);
        return selectedFuelCompany ? selectedFuelCompany.name : '';
    }

    // fetching all the Services


    useEffect(() => {
        const fetchData =async ()=>{
            setIsLoading(true)
            const response = await fuelCompanyService.all();
            setFuelCompanies(response.data)
            setIsLoading(false)
        }
        fetchData()
    }, []);






    useEffect(() => {
        const editConsumption = async () => {
            if ( consumption.date && consumption.distance && consumption.price && consumption.volume && consumption.fuelCompany) {

                console.log("Editing the consumption")
                console.log(consumption)
                consumption.date=consumption.date.toString()
                consumption.volume=consumption.volume.toString()
                consumption.distance=consumption.distance.toString()
                consumption.price=consumption.price.toString()
                const response = await consumptionService.edit(id,consumption);
                if (response.status === 200) {
                    handleSuccessNotification("Consumption Edited Successfully")
                    setTimeout(() => {
                        navigate("/consumption/" + response.data.id)
                    }, 500)
                } else if (response.status === 401) {
                    handleErrorNotification("Your session is expired, please login again!")
                    setTimeout(() => {
                        navigate("/login")
                        window.location.reload()
                    }, 500)
                } else {
                    handleErrorNotification("Something went Wrong!")
                }
            }
        };
        editConsumption()
    }, [consumption]);

    // this will modify the vehicle object to be sent
    const handleSubmit = (event) => {
        event.preventDefault();
        setConsumption({
            distance: distance,
            date : date ,
            price: price,
            volume: volume,
            fuelCompany: fuelCompany,
        });
    };

    // this should take the brand id and return the models from the brands array.
    function brandModelsByBrandId(id) {
        return brands.filter(brand => brand.id === id)[0].models;
    }

    return <div> { isLoading ? <p>Loading...</p> :
        <>
            {deletedNotification}
            <Stack sx={{ width: '100%' }} spacing={2}>
                {successnotification}
                {errornotification}
            </Stack>
            <Grid container spacing={3} direction="column" alignItems="left">
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={3} justify="center">
                                    <Grid item xs={9}>
                                        <Grid container direction="row" spacing={3}>
                                            <Grid item xs={6}>
                                                <Grid container direction="column" spacing={3}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            label="Distance"
                                                            defaultValue={distance}
                                                            value={distance}
                                                            type="number"
                                                            onChange={(event) => setDistance(event.target.value)}
                                                            variant="outlined"
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            label="Price"
                                                            value={price}
                                                            default={price}
                                                            type="number"
                                                            onChange={(event) => setPrice(event.target.value)}
                                                            variant="outlined"
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            label="Volume"
                                                            value={volume}
                                                            defaultValue={volume}
                                                            type="number"
                                                            onChange={(event) => setVolume(event.target.value)}
                                                            variant="outlined"
                                                            required
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Grid container direction="column" spacing={3}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            type="date"
                                                            defaultValue={date}
                                                            value={date}
                                                            onChange={(event) => setDate(event.target.value)}
                                                            variant="outlined"
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <FormControl variant="outlined">
                                                            <InputLabel id="fuel-type-select-label">
                                                                Select Fuel Comp
                                                            </InputLabel>
                                                            <Select
                                                                required
                                                                labelId="fuel-company-select-label"
                                                                value={fuelCompany.id || ""}
                                                                style={{ minWidth: "150px" }}
                                                                onChange={(event) =>
                                                                    setFuelCompany({
                                                                        id: event.target.value,
                                                                        name: lookupFuelCompanyNameById(event.target.value) || "",
                                                                    })
                                                                }
                                                            >
                                                                <MenuItem value="" disabled>
                                                                    Select Fuel Company
                                                                </MenuItem>
                                                                {fuelcompanies.map((fuelCompanyOption) => (
                                                                    <MenuItem key={fuelCompanyOption.id} value={fuelCompanyOption.id}>
                                                                        {fuelCompanyOption.name}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Grid
                                            container
                                            spacing={3}
                                            display="flex"
                                            direction="row"
                                            justify="center"
                                            alignItems="center"
                                        >
                                            <Grid item>
                                                <Button type="submit" variant="contained" color="primary">
                                                    Save
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="contained">Cancel</Button>
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

export default ConsumptionEdit;