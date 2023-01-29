import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import {useEffect, useState} from "react";
import {createMissionOrderService} from "../../services/services";
import useAuthRequest from "../../hooks/useAuthRequest";
import getData from "./data";

const Missions = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {data} = props;
    const [missions, setMissions] = useState(data);
    const [isLoading, setIsLoading] = useState(true);
    const authAxios = useAuthRequest('http://localhost:8080/');
    const missionOrderService = createMissionOrderService(authAxios);

    useEffect(() => {
        const fetchData = async () =>{
            if(!data || data.length === 0){
                setIsLoading(true);
                const data = await getData(missionOrderService)
                setMissions(data);
                setIsLoading(false);
            }

        }
        fetchData();
    }, []);



    const columns = [
        { field: "id", headerName: "ID" },
        {
            field: "startDate",
            headerName: "Start Date",
            flex: 1,
        },
        {
            field: "endDate",
            headerName: "End Date",
            flex: 1,
        },
        {
            field: "employee",
            headerName: "Primary Employee",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "missionSubject",
            headerName: "Mission Subject",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "remplacementEmployee",
            headerName: "Replacement Employee",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "type",
            headerName: "Type",
            flex: 1,
            cellClassName: "name-column--cell",
        },

    ];

    return (
        <Box m="20px">

            <Header title="Missions" subtitle="List of All Missions" />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                }}
            >
                {isLoading ? <p>Loading...</p> :<>
                    <DataGrid checkboxSelection rows={missions} columns={columns} />
                </>
                }
            </Box>
        </Box>
    );
};
Missions.defaultProps = {
    data: []
}

export default Missions;
