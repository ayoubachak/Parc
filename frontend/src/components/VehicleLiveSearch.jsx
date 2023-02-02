import {
    Avatar,
    Box,
    Grid,
    IconButton,
    ListItemAvatar,
    ListItemSecondaryAction, ListItemText,
    Paper,
    TextField, Typography,
    useTheme
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {tokens} from "../theme";
import {useEffect, useState} from 'react';
import MenuItem from "@mui/material/MenuItem";
import {createVehicleService} from "../services/services";
import useAuthRequest from "../hooks/useAuthRequest";
import CloseIcon from "@mui/icons-material/Close";
import {useNavigate} from "react-router-dom";

const uc = (s)=>{
    return (s?.name && s.name.toUpperCase()) || s.toUpperCase()
}

export function VehicleTag( {vehicle, handleVehicleSelection} ){
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const authAxios = useAuthRequest();
    const vehicleService = createVehicleService(authAxios)

    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [query, setQuery ] = useState("")
console.log(vehicle)
    useEffect(()=>{
        const fetchData = async ()=>{
            if(query){
                const response = await vehicleService.search(query)
                // You can make an API call here to get the search results
                if(response.status === 200){
                    setSearchResults(response.data);
                    setShowResults(true);
                }
            } else {
                setSearchResults([]);
                setShowResults(false);
            }
        }
        fetchData()

    },[query])

    const handleChange = event => {
        setQuery(event.target.value);
    };

    return <div style={{position:'relative'}}>
        { vehicle===null?
            <>
                {showResults && <Paper // if the search results Occur
                    style={{
                        position: 'absolute',
                        top: '50px', // adjust the top value as needed
                        left: 0,
                        right: 0,
                        zIndex: 1
                    }}>
                    {searchResults.map( (result, index) => (
                        <MenuItem key={index} onClick={() => handleVehicleSelection(result)}>
                            <ListItemAvatar>
                                <Avatar src={result?.avatar || "../assets/user.png"} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${result.brandModel && result.brandModel.brand.name || "No Brand"} ${result.brandModel && result.brandModel.name || "No Brand Model" } (${result.liscence})`}
                                secondary={`${result.service && uc(result.service)}`}
                            />
                            <ListItemSecondaryAction>
                                <Typography variant="body2">{result.power} HP | {result.numchairs} Chairs | {result.fuelType.name}</Typography>
                            </ListItemSecondaryAction>
                        </MenuItem>
                    ))}
                </Paper>}
                <Box        // the Search Input
                    display="flex"
                    backgroundColor={colors.primary[400]}
                    borderRadius="3px"
                >
                    <InputBase
                        sx={{ ml: 2, flex: 1 }}
                        placeholder="Search Vehicles.."
                        onChange={handleChange}
                    />
                    <IconButton type="button" sx={{ p: 1 }}>
                        <SearchIcon />
                    </IconButton>
                </Box>
            </>
            :<VehicleTagged vehicle={vehicle} handleVehicleSelection={handleVehicleSelection}/>
        }
    </div>

}

const VehicleTagged = ({vehicle, handleVehicleSelection})=>{

    return <div style={{
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px'
    }}>
        <Avatar src={vehicle?.avatar || "../assets/user.png"}
            // onDoubleClick={navigate("/vehicle/"+vehicle.id)} // this is buggy as hell
        />
        <div style={{ marginLeft: '10px' }}>
            <Typography variant="h5" style={{fontWeight:500}}>{`${vehicle.brandModel && vehicle.brandModel.brand.name || "No Brand"} ${vehicle.brandModel && vehicle.brandModel.name || "No Brand Model" } (${vehicle.liscence})`}</Typography>
            <Typography variant="body2">{vehicle.power} HP | {vehicle.numchairs} Chairs | {vehicle.fuelType.name}</Typography>
        </div>
        <div >
            <Typography variant="title">{`${vehicle.service && uc(vehicle.service)}`}</Typography>
        </div>
        <IconButton onClick={() => { handleVehicleSelection(null) }}>
            <CloseIcon />
        </IconButton>
    </div>
}

const OtherVehicleTagged = ({vehicles, vehicle, handleVehicleSelection})=>{

    return <div style={{
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px'
    }}>
        <Avatar src={vehicle?.avatar || "../assets/user.png"}
            // onDoubleClick={navigate("/vehicle/"+vehicle.id)} // this is buggy as hell
        />
        <div style={{ marginLeft: '10px' }}>
            <Typography variant="h5" style={{fontWeight:500}}>{`${vehicle.brandModel && vehicle.brandModel.brand.name || "No Brand"} ${vehicle.brandModel && vehicle.brandModel.name || "No Brand Model" } (${vehicle.liscence})`}</Typography>
            <Typography variant="body2">{vehicle.power} HP | {vehicle.numchairs} Chairs | {vehicle.fuelType.name}</Typography>
        </div>
        <div >
            <Typography variant="title">{`${vehicle.service && uc(vehicle.service)}`}</Typography>
        </div>
        <IconButton onClick={() => { handleVehicleSelection(null) }}>
            <CloseIcon />
        </IconButton>
    </div>
}


export function MultipleVehicleTag({vehicles, handleVehiclesSelection}){
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const authAxios = useAuthRequest();
    const vehicleService = createVehicleService(authAxios)

    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [query, setQuery ] = useState("")
    const [vehicleCount, setVehicleCount] = useState(0)
    const limit = 3;

    useEffect(()=>{
        const fetchData = async ()=>{
            if(query){
                const response = await vehicleService.search(query)
                // You can make an API call here to get the search results
                if(response.status === 200){
                    setSearchResults(response.data);
                    setShowResults(true);
                }
            } else {
                setSearchResults([]);
                setShowResults(false);
            }
        }
        fetchData()

    },[query])
    const handleChange = event => {
        setQuery(event.target.value);
    };
    useEffect(()=>{
        setVehicleCount(vehicles.length);
    },[vehicles])

    return <div style={{position:'relative'}}>
        { vehicleCount < limit?
            <>
                {showResults && <Paper // if the search results Occur
                    style={{
                        position: 'absolute',
                        top: '50px', // adjust the top value as needed
                        left: 0,
                        right: 0,
                        zIndex: 1
                    }}>
                    {searchResults === []?<MenuItem key={69}>No Results found for {query}</MenuItem>:"" /* no idea why not work, i'm tired*/}
                    {searchResults.map(result => (
                        <MenuItem key={result.liscence} onClick={() => {
                            const newVehicles = [...vehicles];
                            newVehicles.push(result)
                            handleVehiclesSelection(newVehicles)
                            setSearchResults([])
                        }}>
                            <ListItemAvatar>
                                <Avatar src={result?.avatar || "../assets/user.png"} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${result.name} (${result.id})`}
                                secondary={`${result.service && uc(result.service)}`}
                            />
                            <ListItemSecondaryAction>
                                <Typography variant="body2">{result.email}</Typography>
                            </ListItemSecondaryAction>
                        </MenuItem>
                    ))}
                </Paper>}
                <Box        // the Search Input
                    display="flex"
                    backgroundColor={colors.primary[400]}
                    borderRadius="3px"
                >
                    <InputBase
                        sx={{ ml: 2, flex: 1 }}
                        placeholder="Search Vehicles.."
                        onChange={handleChange}
                    />
                    <IconButton type="button" sx={{ p: 1 }}>
                        <SearchIcon />
                    </IconButton>
                </Box>
            </>
            :""
        }
        <>
            {vehicles.map((vehicle)=>{
                return <OtherVehicleTagged vehicles={vehicles} vehicle={vehicle} handleVehicleSelection={handleVehiclesSelection}/>
            })}
        </>
    </div>
}