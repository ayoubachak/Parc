import {
    Select,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Avatar, Card, CardContent, Grid, Button, useTheme, Stack,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import useAuthRequest from "../../hooks/useAuthRequest";
import {createEmployeeService, createServiceService} from "../../services/services";
import {useNavigate} from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from 'axios';



const EmployeeAdd = ()=>{
    const authAxios = useAuthRequest();
    const employeeService = createEmployeeService(authAxios);
    const servicesService = createServiceService(authAxios);
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [image,setImage] = useState("");

    const [func, setFunction] = useState("");
    const [service, setService] = useState("");
    const [services, setServices] = useState([]);
    const [employee, setEmployee] = useState({});
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



    const handleFileChange = async (event) => {
        setSelectedFile(event.target.files[0]);
        setImage(event.target.files[0].name);
        console.log(image);

    };



    const handleUpload =  async (event) => {


        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('file', selectedFile);
        if(selectedFile)

        try {
            const response = employeeService.upload_file(formData);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        handleUpload()
        const addEmployee = async ()=>{


            if (employee.name && employee.email && employee.function && employee.service) {
                console.log("Adding the employee")
                const response = await employeeService.addOne(employee);
                if(response.status === 200){
                    handleSuccessNotification("Employee Added Successfully")
                    setTimeout(()=>{
                        navigate("/employee/"+response.data.id)
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
        addEmployee()
    }, [selectedFile,employee])
    const inputFileStyle = {
        border: "1px solid gray",
        padding: "10px",
        borderRadius: "5px"
}

    const handleSubmit = (event) => {
        event.preventDefault();
        setEmployee({
            name: name,
            email: email,
            image : image,
            function: func,
            service: service,

        });

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
                                                label="Email"
                                                value={email}
                                                onChange={(event) => setEmail(event.target.value)}
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
                                            <div className="custom-file-input">
                                                <input
                                                    type="file"
                                                    style={inputFileStyle}
                                                    onChange={handleFileChange}
                                                    required
                                                />
                                                <p>{selectedFile ? selectedFile.name : "Choose a profile picture"}</p>
                                            </div>
                                        </Grid>
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
                                            <Grid container spacing={3} direction="row" justify="space-between">
                                                <Grid item>
                                                    <Button type="submit" variant="contained" color="primary">
                                                        Add Employee
                                                    </Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="contained" color="primary"
                                                        onClick={()=>{navigate("/employees")}}
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

export default EmployeeAdd;