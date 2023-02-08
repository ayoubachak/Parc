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
import useAuthRequest from "../../hooks/useAuthRequest";
import {createUserService, createServiceService} from "../../services/services";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";


const UserEdit = ()=>{
    const authAxios = useAuthRequest();
    const userService = createUserService(authAxios);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [username, setUserName] = useState("");
    const [lastName, setLastName] = useState("");
    const [roles, setRoles] = useState("");

    const [user, setUser] = useState({});
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

    // getting the user by the id
    useEffect(() => {
        const fetchData = async () =>{
            const response = await userService.getById(id)
            setUser(response.data)
            setName(response.data.name)
            setUserName(response.data.username)
            setLastName(response.data.lastname)
            setRoles(response.data.roles)
        }
        fetchData();
    }, [isLoading]);


    useEffect(() => {
        const saveUser = async ()=>{
            console.log("trying to save but the user is : ", user);
            if (user.name && user.username && user.lastname && user.roles && saved) {

                const response = await userService.edit(id,user);
                if(response.status === 200){
                    handleSuccessNotification("User Saved Successfully")
                    setTimeout(()=>{
                        navigate("/user/"+id)
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
        saveUser()
    }, [saved])
    const handleSubmit = (event) => {
        event.preventDefault();
        setUser({
            name: name,
            username:username,
            lastname: lastName,
            roles:roles
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
                                                    label="Last Name"
                                                    value={lastName}
                                                    onChange={(event) => setLastName(event.target.value)}
                                                    variant="outlined"
                                                    required
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="UserName"
                                                    value={username}
                                                    onChange={(event) => setUserName(event.target.value)}
                                                    variant="outlined"
                                                    required
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="User Roles"
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
                                                            Save
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

export default UserEdit;
