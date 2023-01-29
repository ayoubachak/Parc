import React, { useState } from "react";
import {Button, IconButton, Slide, useTheme} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import {createEmployeeService} from "../services/services";
import useAuthRequest from "../hooks/useAuthRequest";



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDelete({ onDelete, userId }) {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const authAxios = useAuthRequest();
    const employeeService = createEmployeeService(authAxios)
    const classes = {
        root: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "& > *": {
                margin: theme.spacing(1),
            },
        },
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = async () => {
        // send the delete request to the server
        const response = await employeeService.delete(userId);
        if (response.status === 204 || response.status === 200){
            console.log("Deleted employee "+userId)
            window.location.reload()

        }
        setOpen(false);
        // I'll use this because fetching the employees again will be lowkey hard.
    };

    return (
        <div className={classes.root}>
            <IconButton onClick={handleClickOpen}>
                <RemoveOutlinedIcon />
            </IconButton>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    {"Confirm Deletion"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to delete this employee? ({userId})
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="secondary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
