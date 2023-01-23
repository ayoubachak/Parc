import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import {Route, Routes} from "react-router-dom";
import Dashboard from "../dashboard";
import Login from "../registration/Login";
import Signup from "../registration/Signup";
import EmailVerification from "../registration/EmailVerification";
import Team from "../team";
import Contacts from "../contacts";
import Invoices from "../invoices";
import Calendar from "../calendar/calendar";
import Geography from "../geography";
import {useState, useEffect} from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import { AuthContext } from '../../hooks/AuthProvider';
import { Redirect } from 'react-router-dom';
import { useContext } from 'react';

import { Router } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import useAuthRequest from '../../hooks/useAuthRequest';
import { createBrandService } from '../../services/services';


const Home = ()=>{
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const  navigate = useNavigate();
    const { isAuthenticated, user, logout, loading } = useContext(AuthContext);
    // const authAxios = useAuthRequest();
    // this is an example
    // const [brandCount, setBrandCount] = useState(0);
    // useEffect(()=>{
    //     const brandService = createBrandService(authAxios);
    //     const fetch =async ()=>{
    //         const response = await brandService.count();
    //         setBrandCount(response.data);
    //         console.log("brandCount ", brandCount);
    //     }
    //     fetch()
    // }, [isAuthenticated, brandCount])
    // console.log("is authed ", isAuthenticated)
    useEffect(() => {
        if(isAuthenticated === false){
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }


    return <>

        <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        <Sidebar isSidebar={isSidebar} />
        <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                {/*Registration */}
                {/*<Route path="/login" element={<Login />} />*/}
                {/*<Route path="/signup" element={<Signup />} />*/}
                {/*<Route path="/signup" element={<EmailVerification />} />*/}

                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                {/*<Route path="/form" element={<Form />} />*/}
                {/*<Route path="/bar" element={<Bar />} />*/}
                {/*<Route path="/pie" element={<Pie />} />*/}
                {/*<Route path="/line" element={<Line />} />*/}
                {/*<Route path="/faq" element={<FAQ />} />*/}
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
            </Routes>
        </main>
        </div>
    </ThemeProvider>
</ColorModeContext.Provider>
        </>


}

export default Home;