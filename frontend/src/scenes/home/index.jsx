import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import {Route, Routes} from "react-router-dom";
import Dashboard from "../dashboard";
import Team from "../team";
import Contacts from "../contacts";
import Invoices from "../invoices";
import Calendar from "../calendar/calendar";
import Geography from "../geography";
import {useState} from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";


const Home = ()=>{
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

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

                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
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