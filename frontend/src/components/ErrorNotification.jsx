import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import {IconButton, Snackbar, useTheme} from "@mui/material";



const ErrorNotification = ({ open, setOpen, message }) => {
    const theme = useTheme();
    const classes = {
        close: {
            padding: theme.spacing(0.5),
        },
    };
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message}
            action={
                <React.Fragment>
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
            }
        />
    );
};

export default ErrorNotification;
