import {
    Select,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Avatar, Card, CardContent, Grid, Typography, Button, useTheme, Stack,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import useAuthRequest from "../../hooks/useAuthRequest";
import {
    createBrandModelService,
    createCategoryService,
    createVehicleService,
    createFuelTypeService,
    createServiceService
} from "../../services/services";
import {tokens} from "../../theme";
import {useNavigate} from "react-router-dom";
import ErrorNotification from "../../components/ErrorNotification";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';



const VehicleAdd = ()=>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const authAxios = useAuthRequest();
    const vehicleService = createVehicleService(authAxios);
    const servicesService = createServiceService(authAxios);
    const brandModelsService = createBrandModelService(authAxios);
    const fuelTypeService = createFuelTypeService(authAxios);
    const categoryService = createCategoryService(authAxios);

    const [isLoading, setIsLoading] = useState(true);
    // variable define the attributes of the vehicule object...
    const [color, setColor] = useState("");
    const [liscence, setLiscence] = useState("");
    const [model, setModel] = useState("");
    const [numChairs, setNumChairs] = useState("");
    const [power, setPower] = useState("");
    const [vehkm, setVehkm] = useState("");

    const [brand, setBrand] = useState({});
    const [brandModel, setBrandModel] = useState({});
    const [fuelType, setFuelType] = useState({});
    const [category, setCategory] = useState({});
    const [service, setService] = useState({});

    // variables we'll get from the endpoints...

    const [brandModels, setBrandModels] = useState([]);
    const [brands, setBrands] = useState([]);
    const [fuelTypes, setFuelTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [services, setServices] = useState([]);

    const [vehicle, setVehicle] = useState({});

    const [successnotification, setSuccessNotification] = useState("");
    const [errornotification, setErrorNotification] = useState("");

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
    const lookupServiceNameById = (id) => {
        const selectedService = services.find((service) => service.id === id);
        return selectedService ? selectedService.name : '';
    }
    const lookupBrandModelNameById = (id) => {
        const selectedBrandModel = brandModels.find((brandModel) => brandModel.id === id);
        return selectedBrandModel ? selectedBrandModel.name : '';
    }
    const lookupBrandNameById = (id) => {
        const selectedBrand = brands.find((brand) => brand.id === id);
        return selectedBrand ? selectedBrand.name : '';
    }
    const lookupFuelTypeNameById = (id) => {
        const selectedFuelType = fuelTypes.find((fuelType) => fuelType.id === id);
        return selectedFuelType ? selectedFuelType.name : '';
    }
    const lookupCategoryNameById = (id) => {
        const selectedCategory = categories.find((category) => category.id === id);
        return selectedCategory ? selectedCategory.name : '';
    }

    // fetching all the Services
    useEffect(() => {
        const fetchData =async ()=>{
            setIsLoading(true)
            const response = await servicesService.all();
            setServices(response.data)
            setIsLoading(false)
        }
        fetchData()
    }, []);

    // fetching all the BrandModels ( these objects include the brands with them ! )
    useEffect(() => {
        const fetchData =async ()=>{
            setIsLoading(true)
            const response = await brandModelsService.all();
            // we won't be setting the brands from here, we''
            // brandModels(response.data)

            // this array will have organized data on it
            const brandsAndModels = response.data.reduce((brands, item) => {
                const brandIndex = brands.findIndex(brand => brand.id === item.brand.id);
                if (brandIndex === -1) {
                    brands.push({
                        id: item.brand.id,
                        name: item.brand.name,
                        models: [{ id: item.id, name: item.name }]
                    });
                } else {
                    brands[brandIndex].models.push({ id: item.id, name: item.name });
                }
                return brands;
            }, []);
            // after we set the organized our input we're gonna set the brands to it's value
            setBrands(brandsAndModels)
            setIsLoading(false)
        }
        fetchData()
    }, []);

    // fetching all the fuelTypes
    useEffect(() => {
        const fetchData =async ()=>{
            setIsLoading(true)
            const response = await fuelTypeService.all();
            setFuelTypes(response.data)
            setIsLoading(false)
        }
        fetchData()
    }, []);
    // fetching all the categories
    useEffect(() => {
        const fetchData =async ()=>{
            setIsLoading(true)
            const response = await categoryService.all();
            setCategories(response.data)
            setIsLoading(false)
        }
        fetchData()
    }, []);

    // this will handle sending the vehicle to the server once it's modified by the submit
    useEffect(() => {
        const addVehicle = async ()=>{
            if (
                vehicle.color &&
                vehicle.liscence &&
                vehicle.model &&
                vehicle.numChairs &&
                vehicle.power &&
                vehicle.vehkm &&
                // vehicle.brand &&
                vehicle.brandModel &&
                vehicle.fuelType &&
                vehicle.category &&
                vehicle.service
            ) {
                console.log("Adding the vehicle")
                const response = await vehicleService.addOne(vehicle);
                if(response.status === 200){
                    handleSuccessNotification("Vehicle Added Successfully")
                    setTimeout(()=>{
                        navigate("/vehicle/"+response.data.id)
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
        addVehicle()
    }, [vehicle])

    // this will modify the vehicle object to be sent
    const handleSubmit = (event) => {
        event.preventDefault();
        setVehicle({
            color : color,
            liscence : liscence,
            model : model,
            numChairs : numChairs,
            power : power,
            vehkm : vehkm,
            // brand : brand,
            brandModel : {
                id:brandModel.id,
                name:brandModel.name,
                brand : brand
            },
            fuelType : fuelType,
            category : category,
            service : service,
        });
    };

    // this should take the brand id and return the models from the brands array.
    function brandModelsByBrandId(id) {
        return brands.filter(brand => brand.id === id)[0].models;
    }

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
                                <Grid item xs={3}>
                                    <Grid container direction="column" spacing={3}>
                                        {/*color*/}
                                        {/*liscence*/}
                                        {/*model*/}
                                        {/*numChairs*/}
                                        {/*power*/}
                                        {/*vehkm*/}
                                        {/*vehkm*/}
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Color"
                                                value={color}
                                                onChange={(event) => setColor(event.target.value)}
                                                variant="outlined"
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Liscence"
                                                value={liscence}
                                                onChange={(event) => setLiscence(event.target.value)}
                                                variant="outlined"
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Model"
                                                value={model}
                                                onChange={(event) => setModel(event.target.value)}
                                                variant="outlined"
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Number of Chairs"
                                                value={numChairs}
                                                type="number"
                                                onChange={(event) => setNumChairs(event.target.value)}
                                                variant="outlined"
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Power ( in HP )"
                                                type="number"
                                                value={power}
                                                onChange={(event) => setPower(event.target.value)}
                                                variant="outlined"
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Distance Traveled (Km)"
                                                type="number"
                                                value={vehkm}
                                                onChange={(event) => setVehkm(event.target.value)}
                                                variant="outlined"
                                                required
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3}>
                                    <Grid container direction="column" spacing={3}>
                                        {/*this is an example to a select*/}
                                        {/*brandModels*/}
                                        {/*brands*/}
                                        {/*fuelTypes*/}
                                        {/*categories*/}
                                        {/*services*/}
                                        <Grid item xs={12}>
                                            <FormControl variant="outlined">
                                                <InputLabel id="service-select-label">Select Service</InputLabel>
                                                <Select
                                                    required
                                                    labelId="service-select-label"
                                                    value={service.id || ""}
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
                                            <FormControl variant="outlined">
                                                <InputLabel id="brand-select-label">Select Brand</InputLabel>
                                                <Select
                                                    required
                                                    labelId="brand-select-label"
                                                    value={brand.id || ""}
                                                    style={{ minWidth: "150px" }}
                                                    onChange={(event) => { setBrand({id: event.target.value, name:lookupBrandNameById(event.target.value) || ""}); setBrandModels(brandModelsByBrandId(event.target.value))  }  }
                                                >
                                                    <MenuItem value="" disabled>Select Brand</MenuItem>
                                                    {brands.map((brandOption) => (
                                                        <MenuItem key={brandOption.id} value={brandOption.id}>
                                                            {brandOption.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>

                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl variant="outlined">
                                                <InputLabel id="brandModels-select-label">Select Brand Model</InputLabel>
                                                <Select
                                                    required
                                                    labelId="brandModel-select-label"
                                                    value={brandModel.id || ""}
                                                    style={{ minWidth: "150px" }}
                                                    onChange={(event) => setBrandModel({id: event.target.value, name:lookupBrandModelNameById(event.target.value) || ""})}
                                                >
                                                    <MenuItem value="" disabled>Select Brand Model</MenuItem>
                                                    {brandModels.map((brandModelOption) => (
                                                        <MenuItem key={brandModelOption.id} value={brandModelOption.id}>
                                                            {brandModelOption.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>

                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl variant="outlined">
                                                <InputLabel id="fuelType-select-label">Select FuelType</InputLabel>
                                                <Select
                                                    required
                                                    labelId="fuelType-select-label"
                                                    value={fuelType.id || ""}
                                                    style={{ minWidth: "150px" }}
                                                    onChange={(event) => setFuelType({id: event.target.value, name:lookupFuelTypeNameById(event.target.value) || ""})}
                                                >
                                                    <MenuItem value="" disabled>Select FuelType</MenuItem>
                                                    {fuelTypes.map((fuelTypeOption) => (
                                                        <MenuItem key={fuelTypeOption.id} value={fuelTypeOption.id}>
                                                            {fuelTypeOption.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>

                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl variant="outlined">
                                                <InputLabel id="category-select-label">Select Category</InputLabel>
                                                <Select
                                                    required
                                                    labelId="category-select-label"
                                                    value={category.id || ""}
                                                    style={{ minWidth: "150px" }}
                                                    onChange={(event) => setCategory({id: event.target.value, name:lookupCategoryNameById(event.target.value) || ""})}
                                                >
                                                    <MenuItem value="" disabled>Select Category</MenuItem>
                                                    {categories.map((categoryOption) => (
                                                        <MenuItem key={categoryOption.id} value={categoryOption.id}>
                                                            {categoryOption.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>

                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container spacing={3} direction="row" justify="space-between">
                                                <Grid item>
                                                    <Button type="submit" variant="contained" color="primary">
                                                        Add Vehicle
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

export default VehicleAdd;