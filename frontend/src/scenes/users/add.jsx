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
import {createUserService } from "../../services/services";
import {useNavigate} from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';



const UserAdd = ()=>{
    const authAxios = useAuthRequest();
    const userService = createUserService(authAxios);
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [roles, setRoles] = useState("");
    const [user, setUser] = useState({});
    const [successnotification, setSuccessNotification] = useState("");
    const [errornotification, setErrorNotification] = useState("");

    // Roles to handle the error, set the error message
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


    useEffect(() => {
        const addUser = async ()=>{
            if (user.name && user.lastname && user.username && user.password && user.roles ) {
                console.log("Adding the user")
                const response = await userService.addOne(user);
                if(response.status === 200){
                    handleSuccessNotification("User Added Successfully")
                    setTimeout(()=>{
                        navigate("/user/"+response.data.id)
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
        addUser()
    }, [user])

    const handleSubmit = (event) => {
        event.preventDefault();
        if(password === passwordConfirmation){
            setUser({
                name: name,
                username:username,
                lastname: lastname,
                password: password,
                roles:roles
            });
        }
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
                                                onChange={(event) => {
                                                    setName(event.target.value)
                                                    if(username === name + "_"+lastname || username === name+lastname){
                                                        setUserName(name+"_"+lastname)
                                                    }
                                                }}
                                                variant="outlined"
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Last Name"
                                                value={lastname}
                                                onChange={(event) => {
                                                    setLastName(event.target.value)
                                                    if(username === name + "_"+lastname || username === name+lastname){
                                                        setUserName(name+"_"+lastname)
                                                    }
                                                }}
                                                variant="outlined"
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Username"
                                                value={username}
                                                onChange={(event) => setUserName(event.target.value)}
                                                variant="outlined"
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Password"
                                                type="password"
                                                value={password}
                                                onChange={(event) => setPassword(event.target.value)}
                                                variant="outlined"
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Confirm Password"
                                                type="password"
                                                value={passwordConfirmation}
                                                onChange={(event) => setPasswordConfirmation(event.target.value)}
                                                variant="outlined"
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Roles"
                                                value={roles}
                                                onChange={(event) => setRoles(event.target.value)}
                                                variant="outlined"
                                                required
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Grid container spacing={3} direction="row" justify="space-between">
                                                <Grid item>
                                                    <Button type="submit" variant="contained" color="primary">
                                                        Add User
                                                    </Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="contained" color="primary"
                                                        onClick={()=>{navigate("/users")}}
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

export default UserAdd;