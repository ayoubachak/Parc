import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Box,
    Divider, Fab,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import {Add, Link, Mic, Send} from "@mui/icons-material";
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        // height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '65vh',
        overflowY: 'auto'
    }
});

const Chat = () => {
    const classes = useStyles();

    return (
        <div >
            {/*<Grid container>*/}
            {/*    <Grid item xs={12} >*/}
            {/*        <Typography variant="h5" className="header-message">Chat</Typography>*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}
            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500} style={{position:"relative"}}>
                    {/*<List>*/}
                    {/*    <ListItem button key="RemySharp">*/}
                    {/*        <ListItemIcon>*/}
                    {/*            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />*/}
                    {/*        </ListItemIcon>*/}
                    {/*        <ListItemText primary="John Wick"></ListItemText>*/}
                    {/*    </ListItem>*/}
                    {/*</List>*/}
                    <Divider />
                    <Grid item xs={12} style={{padding: '10px'}}>
                        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                    </Grid>
                    <Divider />
                    <List>
                        <ListItem button key="RemySharp">
                            <ListItemIcon>
                                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                            </ListItemIcon>
                            <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                            <ListItemText secondary="online" align="right"></ListItemText>
                        </ListItem>
                        <ListItem button key="Alice">
                            <ListItemIcon>
                                <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                            </ListItemIcon>
                            <ListItemText primary="Alice">Alice</ListItemText>
                        </ListItem>
                        <ListItem button key="CindyBaker">
                            <ListItemIcon>
                                <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
                            </ListItemIcon>
                            <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
                        </ListItem>
                    </List>
                    <Grid container style={{position:"absolute", bottom:"10px", height:50}}>
                        <Grid item xs={1} align="right" style={{position:"absolute", right:"40px", bottom:"10px"}}>
                            <Fab color="primary" aria-label="add"><Add /></Fab>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={9}>
                    <List>
                        <ListItem button key="RemySharp">
                            <ListItemIcon>
                                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                            </ListItemIcon>
                            <ListItemText primary="John Wick"></ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                    <List className={classes.messageArea}>
                        <ListItem key="1">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="right" secondary="09:30"></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="2">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="left" secondary="09:31"></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="3">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="right" secondary="10:30"></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                    </List>
                    <Divider />
                    <Grid container style={{padding: '20px'}}>
                        <Grid item xs={9}>
                            <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                        </Grid>
                        <Grid item xs={1} align="right">
                            <Fab color="primary" aria-label="add"><Send /></Fab>
                        </Grid>
                        <Grid item xs={1} align="right">
                            <label htmlFor="file-input">
                                <Fab color="primary" aria-label="add" component="span">
                                    <Link />
                                </Fab>
                            </label>
                            <input
                                type="file"
                                id="file-input"
                                style={{ display: "none" }}
                                onChange={(e) => {console.log("file uploading is not working yet..")}}
                            />
                        </Grid>
                        <RecordButton forWho={{}}/>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}


const RecordButton = ({forWho}) => {
    const [isRecording, setIsRecording] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [startTime, setStartTime] = useState(0);

    function formatElapsedTime(milliseconds) {
        if(milliseconds < 1000) return "0s";
        const seconds = Math.floor(milliseconds / 1000) % 60;
        const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
        const hours = Math.floor(milliseconds / (1000 * 60 * 60)) % 24;

        let timeString = "";
        if (hours > 0) {
            timeString += `${hours}h`;
        }
        if (minutes > 0) {
            timeString += `${minutes}m`;
        }
        if (seconds > 0) {
            timeString += `${seconds}`;
        }

        return timeString;
    }

    useEffect(() => {
        let interval = null;
        if (isRecording) {
            interval = setInterval(() => {
                setTimeElapsed((Date.now() - startTime));
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isRecording, timeElapsed, startTime]);

    const startRecording = () => {
        setIsRecording(true);
        setStartTime(Date.now());
    };

    const stopRecording = () => {
        setIsRecording(false);
        setTimeElapsed(0);
    };

    return (
        <Grid item xs={1} align="right">
            <Fab
                color="primary"
                aria-label="add"
                onClick={isRecording ? stopRecording : startRecording}
            >

                {isRecording?
                    <div>{formatElapsedTime(timeElapsed)}</div>
                    :<Mic />
                }
            </Fab>
        </Grid>
    );
};


export default Chat;