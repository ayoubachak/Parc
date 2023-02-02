import {Box, Grid, IconButton, Paper, TextField, useTheme} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {tokens} from "../theme";
import {useState} from 'react';
import MenuItem from "@mui/material/MenuItem";
import {createEmployeeService} from "../services/services";
import useAuthRequest from "../hooks/useAuthRequest";


export function EmployeeTag( {employee, setEmployee} ){
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const authAxios = useAuthRequest();
    const employeeService = createEmployeeService(authAxios)

    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [query, setQuery ] = useState("")

    const handleChange = event => {
        setQuery(event.target.value);
        if (event.target.value) {
            // You can make an API call here to get the search results
            setSearchResults([
                { name: 'John Doe', email: 'john.doe@example.com' },
                { name: 'Jane Doe', email: 'jane.doe@example.com' }
            ]);
            setShowResults(true);
        } else {
            setSearchResults([]);
            setShowResults(false);
        }
    };


    return<div style={{position:'relative'}}>
        { employee===null?
            <>
                {showResults && <EmployeeSearchResults searchResults={searchResults}/>}
                <Box
                    display="flex"
                    backgroundColor={colors.primary[400]}
                    borderRadius="3px"
                >
                    <InputBase
                        sx={{ ml: 2, flex: 1 }}
                        placeholder="Search Employees.."
                        onChange={handleChange}
                    />
                    <IconButton type="button" sx={{ p: 1 }}>
                        <SearchIcon />
                    </IconButton>
                </Box>
            </>
            :<EmployeeTagged employee={employee}/>
        }
    </div>

}

const EmployeeSearchResults = ({searchResults})=>{
    return <Paper
        style={{
            position: 'absolute',
            top: '50px', // adjust the top value as needed
            left: 0,
            right: 0,
            zIndex: 1
        }}>
        {searchResults.map(result => (
            <MenuItem key={result.email}>{result.name}</MenuItem>
        ))}
    </Paper>
}

const EmployeeTagged = ({employee})=>{

    return <div style={{ overflowY: 'scroll'}}>

    </div>
}

export function MultipleEmployeeTag({employees}){

}