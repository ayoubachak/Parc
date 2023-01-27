import Login from './scenes/registration/Login';
import {AuthContext} from "./hooks/AuthProvider";
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import {CssBaseline, ThemeProvider} from "@mui/material";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Invoices from "./scenes/invoices";
import Calendar from "./scenes/calendar/calendar";
import Geography from "./scenes/geography";
import {useState, useEffect} from "react";
import { ColorModeContext, useMode } from "./theme";
import React, { Fragment } from 'react';
import RequireAuth from "./components/RequireAuth";
import Wrapper from "./components/Wrapper";
import useAuth from "./hooks/useAuth";



function App() {
    const {isAuthenticated} = useAuth()
    const navigate = useNavigate();
    useEffect(()=>{
        if (isAuthenticated){
            navigate('/')
        }
    },[isAuthenticated])
    return (
        <Wrapper>
            <Routes>
                <Route path='/login' element={<Login/>} />
                <Route element={<RequireAuth/>} >
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/invoices" element={<Invoices />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/geography" element={<Geography />} />
                </Route>
            </Routes>
        </Wrapper>
    );
}

export default App;