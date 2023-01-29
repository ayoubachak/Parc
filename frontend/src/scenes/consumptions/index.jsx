import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import {useEffect, useState} from "react";
import {createConsumptionService} from "../../services/services";
import useAuthRequest from "../../hooks/useAuthRequest";
import getData from "./data";

const Consumptions = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const authAxios = useAuthRequest('http://localhost:8080/');
  const consumptionService = createConsumptionService(authAxios);
    const [consumptions, setConsumptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () =>{
            setIsLoading(true);
            const data = await getData(consumptionService);
            setConsumptions(data);
            setIsLoading(false);

        }
        fetchData();
    }, []);

    // id:consumption.id,
    // employee:consumption.employee?.name,
    // startDate:consumption.startDate,
    // endDate:consumption.endDate,
    // missionSubject:consumption.missionSubject,
    // remplacementEmployee:consumption.remplacementEmployee?.name, // shit that's a typo 🙈
    // type:consumption.type

    const columns = [
    { field: "id", headerName: "ID" },
      {
          field: "date",
          headerName: "Date",
          flex: 1,
      },
    {
      field: "distance",
      headerName: "Distance",
      flex: 1,
      cellClassName: "name-column--cell",
    },
      {
          field: "volume",
          headerName: "Volume",
          flex: 1,
          cellClassName: "name-column--cell",
      },
    {
      field: "fuelCompany",
      headerName: "Fuel Company",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.price}
        </Typography>
      ),
    },

  ];

  return (
    <Box m="20px">

      <Header title="Consumptions" subtitle="List of All Consumptions" />
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
            <DataGrid checkboxSelection rows={consumptions} columns={columns} />
          </>
          }
          </Box>
    </Box>
  );
};

export default Consumptions;
