import {Avatar, Grid, Typography, useTheme} from "@mui/material";
import {string} from "yup";
import {useNavigate} from "react-router-dom";
// import { makeStyles } from '@mui/styles';
const ucfirst = (s)=>{
    return s.toUpperCase()
}
const EmployeeBox = ({ employee }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const classes = {
        root: {
            height: 100,
            width: '100%',
            border: '1px solid #9A9797FF',
            borderRadius: 5,
            padding: theme.spacing(2),
            margin: theme.spacing(2),
            '&:hover': {
                background: '#fafafa',
                cursor: 'pointer',
            },
        },
        avatar: {
            width: 60,
            height: 60,
            marginRight: theme.spacing(2),
        },
        name: {
            fontWeight: 'bold',
            marginRight: theme.spacing(2),
        },
        function: {
            fontSize: 12,
            color: '#555',
        },
        line: {
            width: 1,
            height: '100%',
            background: '#ddd',
            margin: theme.spacing(0, 2),
        },
    }

    return (
        <Grid container style={classes.root} alignItems="center" onClick={()=>{navigate("/employee/"+employee.id)}}>
            <Grid item xs={2}>
                <Avatar style={classes.avatar} src={employee?.avatar || '../assets/user.png'} />
            </Grid>
            <Grid item xs={3}>
                <Typography style={classes.name}>
                    {employee.name} ({employee.id})
                </Typography>
                <Typography style={classes.function}>{employee.function}</Typography>
            </Grid>
            <Grid item style={classes.line} />
            <Grid item xs={2} display="flex" justifyContent="center" alignItems="center">
                <Typography style={classes.name} >{ucfirst(employee.service.name)}</Typography>
            </Grid>
        </Grid>
    );
};

export default EmployeeBox;