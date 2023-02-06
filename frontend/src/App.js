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
import { useEffect} from "react";
import React from 'react';
import RequireAuth from "./components/RequireAuth";
import Wrapper from "./components/Wrapper";
import useAuth from "./hooks/useAuth";

import Vehicles from "./scenes/vehicles";
import Missions from "./scenes/order_missions";
import Employees from "./scenes/employees";
import Consumptions from "./scenes/consumptions";
import Employee from "./scenes/employees/single";
import EmployeeAdd from "./scenes/employees/add";
import EmployeeEdit from "./scenes/employees/edit";
import Vehicle from "./scenes/vehicles/single";
import VehicleAdd from "./scenes/vehicles/add";
import VehicleEdit from "./scenes/vehicles/edit";
import Mission from "./scenes/order_missions/single";
import MissionAdd from "./scenes/order_missions/add";
import MissionEdit from "./scenes/order_missions/edit";
import ConsumptionEdit from "./scenes/consumptions/edit";
import ConsumptionAdd from "./scenes/consumptions/add";
import Consumption from "./scenes/consumptions/single";
import Inbox from "./scenes/inbox";
import Chat from "./scenes/chat";

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
                    {/*<Route path="/team" element={<Team />} />*/}
                    {/*<Route path="/contacts" element={<Contacts />} />*/}
                    {/*<Route path="/invoices" element={<Invoices />} />*/}
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/geography" element={<Geography />} />

                    <Route path="/vehicles" element={<Vehicles />} />
                    <Route path="/vehicle/:id" element={<Vehicle />} />
                    <Route path="/vehicle/:id/edit" element={<VehicleEdit />} />
                    <Route path="/vehicle/add" element={<VehicleAdd />} />

                    <Route path="/employees" element={<Employees />} />
                    <Route path='/employee/:id' element={<Employee/>} />
                    <Route path='/employee/:id/edit' element={<EmployeeEdit/>} />
                    <Route path='/employee/add' element={<EmployeeAdd/>} />

                    <Route path="/missions" element={<Missions />} />
                    <Route path="/mission/:id" element={<Mission />} />
                    <Route path="/mission/:id/edit" element={<MissionEdit />} />
                    <Route path="/mission/add" element={<MissionAdd />} />

                    <Route path="/consumptions" element={<Consumptions />} />
                    <Route path="/consumption/:id/edit" element={<ConsumptionEdit />} />
                    <Route path="/consumption/add" element={<ConsumptionAdd />} />
                    <Route path="/consumption/:id" element={<Consumption />} />

                    <Route path="/inbox" element={<Inbox />} />
                    <Route path="/inbox/:empId/send" element={<Inbox />} />
                    <Route path="/inbox/:empId/all" element={<Inbox />} />
                    <Route path="/inbox/:id" element={<Inbox />} />

                    <Route path="/chat" element={<Chat />} />


                </Route>
            </Routes>
        </Wrapper>
    );
}

export default App;