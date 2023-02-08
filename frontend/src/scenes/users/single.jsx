import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {createUserService, createMissionOrderService} from "../../services/services";
import useAuthRequest from "../../hooks/useAuthRequest";
import {Avatar, Box, Button, Card, CardContent, Grid, IconButton, Typography, useTheme} from "@mui/material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import {tokens} from "../../theme";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const uc = (s)=>{
    return s.toUpperCase()
}


const splitAndTrim = (text, delimiter) => text.split(delimiter).map(str => str.trim());

const mapUserRolesToBox = (roles, colors) =>{
    roles = splitAndTrim(roles, ",")
    return <Box
        width="50%"
        m="10px 10px 10px 0px"
        p="5px"
        display="flex"
        justifyContent="center"
        backgroundColor={
            roles === "Manager"
                ? colors.greenAccent[600]
                : roles === "Driver"
                    ? colors.greenAccent[700]
                    : colors.greenAccent[700]
        }
        borderRadius="4px"
    >
        {roles === "Manager" && <AdminPanelSettingsOutlinedIcon />}
        {roles === "Driver" && <DirectionsCarOutlinedIcon />}
        {roles === "Admin" && <LockOpenOutlinedIcon />}
        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            {roles}
        </Typography>
    </Box>
}

const User = ()=>{
    let { id } = useParams();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const authAxios = useAuthRequest();
    const userService = createUserService(authAxios);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [deleted, setDeleted] = useState(false);
    const navigate = useNavigate()
    const [deletedNotification, setDeletedNotification ]= useState("")
    useEffect(() => {
        const fetchData = async () =>{
            setIsLoading(true);
            const response = await userService.getById(id)
            setUser(response.data)
            setIsLoading(false);
        }
        fetchData();
    }, []);


    useEffect(()=>{
        const deleteUser =async ()=>{
            if(deleted){
                const response = await userService.delete(user.id);
                if(response.status === 204){
                    console.log("Deleted")

                    setDeletedNotification(
                    <Alert severity="info">
                        <AlertTitle>Info</AlertTitle>
                        User {user.name} ({user.id}) — <strong>Was Deleted</strong>
                    </Alert>
                    )
                    setTimeout(()=>{
                        navigate("/users")
                    },1000)
                }
            }
        }
        deleteUser()
    },[deleted])

    return <div> { isLoading ? <p>Loading...</p> :
        <>
        {deletedNotification}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={3}>
                                    <Avatar src={user.avatar ? user.avatar : '../../assets/user.png'} style={{ width: '100px', height: '100px' }} />
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="h2" style={{fontWeight:600}}>{user.name} {user.lastname} ({user.id})</Typography>
                                    <Typography variant="h4" style={{fontWeight:300}}>{user.username}</Typography>
                                    <Typography variant="div" style={{display:"flex", justifyContent:"flex-start"}}>{user.roles}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="contained" color="primary" onClick={()=>{navigate("/chat/"+user.id+"")}}>
                                        Chat
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <Button variant="contained" color="primary" onClick={()=>{navigate("/user/"+user.id+"/edit")}}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={()=>{setDeleted(true);console.log(deleted)}}>
                                        Delete
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>

                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    }
    </div>
}
export default User;