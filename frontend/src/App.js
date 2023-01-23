import Login from './scenes/registration/Login';
import {AuthContext} from "./hooks/AuthProvider";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
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
import { useContext } from 'react';

import {useNavigate} from "react-router-dom";

function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const navigate = useNavigate();
    const { isAuthenticated, user, logout, loading } = useContext(AuthContext);

    useEffect(() => {
        if(isAuthenticated === false){
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
            <Routes>
                <Route path='/login' element={<Login/>} />
                {isAuthenticated === true ? (
                    <ColorModeContext.Provider value={colorMode}>
                        <ThemeProvider theme={theme}>
                            <CssBaseline />
                            <div className="app">
                                <Sidebar isSidebar={isSidebar} />
                                <main className="content">
                                    <Topbar setIsSidebar={setIsSidebar} />
                                    <Route path="/" element={<Dashboard />} />
                                    <Route path="/team" element={<Team />} />
                                    <Route path="/contacts" element={<Contacts />} />
                                    <Route path="/invoices" element={<Invoices />} />
                                    <Route path="/calendar" element={<Calendar />} />
                                    <Route path="/geography" element={<Geography />} />
                                </main>
                            </div>
                        </ThemeProvider>
                    </ColorModeContext.Provider>
                ) : (
                    <Route path='/' component={Login} />
                )}
            </Routes>

    );
}

export default App;