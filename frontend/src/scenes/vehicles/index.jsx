import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import {useEffect, useState} from "react";
import {createMissionOrderService, createVehicleService} from "../../services/services";
import useAuthRequest from "../../hooks/useAuthRequest";
import getData from "./data";

const Vehicles = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const authAxios = useAuthRequest('http://localhost:8080/');
    const vehicleService = createVehicleService(authAxios);
    const [vehicles, setVehicles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () =>{
            setIsLoading(true);
            const data = await getData(vehicleService)
            setVehicles(data);
            setIsLoading(false);
        }
        fetchData();
    }, []);


    const columns = [
        { field: "id", headerName: "ID" },
        {
            field: "brandmodel",
            headerName: "Brand Model",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "brand",
            headerName: "Brand",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "fuelType",
            headerName: "Fuel Type",
            flex: 1,
        },
        {
            field: "category",
            headerName: "Category",
            flex: 1,
        },
        {
            field: "color",
            headerName: "Color",
            flex: 1,
            // renderCell: (params) => (
            //     <Typography color={params.row.color}>
            //         {params.row.color}
            //     </Typography>
            // ),
        },
        {
            field: "model",
            headerName: "Model",
            flex: 1,
        },
        {
            field: "vehkm",
            headerName: "Distance Driven",
            flex: 1,
            renderCell: (params) => (
                <Typography color={colors.greenAccent[500]}>
                    {params.row.vehkm} Km
                </Typography>
            ),
        },
        {
            field: "liscence",
            headerName: "Licence",
            flex: 1,
        },
        {
            field: "numchairs",
            headerName: "Number of Chairs",
            flex: 1,
            renderCell: (params) => (
                <Typography color={colors.blueAccent[500]}>
                    {params.row.numchairs}
                </Typography>
            ),
        },
        {
            field: "power",
            headerName: "Power",
            flex: 1,
            renderCell: (params) => (
                <Typography color={colors.primary}>
                    {params.row.power} HP
                </Typography>
            ),
        },


    ];

    return (
        <Box m="20px">

            <Header title="Vehicles" subtitle="List of All Vehicles" />
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
                    <DataGrid checkboxSelection rows={vehicles} columns={columns} />
                </>
                }
            </Box>
        </Box>
    );
};

export default Vehicles;
