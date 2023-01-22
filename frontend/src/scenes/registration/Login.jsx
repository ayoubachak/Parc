import React, { useContext, useState } from 'react';

import { AuthContext } from '../../hooks/AuthProvider';
import {Box, Button, TextField} from "@mui/material";
// import Header from "../../components/Header";
import { Typography } from '@mui/material';
import {Formik} from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

const Login = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const { login } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (values) => {
        // event.preventDefault();
        login(values.username, values.password);
    }

    const Header = ({ title, subtitle }) => {
        return (
            <Box textAlign="center">
                <Typography variant="h2">{title}</Typography>
                <Typography variant="subtitle1">{subtitle}</Typography>
            </Box>
        );
    };

    return (
        <Box m="20px">
            <Header title="Admin Login" subtitle="This View is for admins Only" />

            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="username"
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.address1}
                                name="password"
                                error={!!touched.address1 && !!errors.address1}
                                helperText={touched.address1 && errors.address1}
                                sx={{ gridColumn: "span 4" }}
                            />

                        </Box>
                        <Box display="flex" justifyContent="center" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Login
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    username: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required")
});
const initialValues = {
    username: "",
    password: "",
};
export default Login;
