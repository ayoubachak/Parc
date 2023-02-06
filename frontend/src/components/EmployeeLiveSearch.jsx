import {
    Avatar,
    Box,
    IconButton,
    ListItemAvatar,
    ListItemSecondaryAction, ListItemText,
    Paper,
    Typography,
    useTheme
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {tokens} from "../theme";
import {useEffect, useState} from 'react';
import MenuItem from "@mui/material/MenuItem";
import {createEmployeeService} from "../services/services";
import useAuthRequest from "../hooks/useAuthRequest";
import CloseIcon from "@mui/icons-material/Close";

const uc = (s)=>{
    return s.toUpperCase()
}

export function EmployeeTag( {employee, handleEmployeeSelection} ){
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const authAxios = useAuthRequest();
    const employeeService = createEmployeeService(authAxios)

    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [query, setQuery ] = useState("")

    useEffect(()=>{
        const fetchData = async ()=>{
            if(query){
                const response = await employeeService.search(query)
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
        { employee===null?
            <>
                {showResults && <Paper // if the search results Occur
                    style={{
                        position: 'absolute',
                        top: '50px', // adjust the top value as needed
                        left: 0,
                        right: 0,
                        zIndex: 1
                    }}>
                    {searchResults.map((result,index) => (
                        <MenuItem key={index} onClick={() => handleEmployeeSelection(result)}>
                            <ListItemAvatar>
                                <Avatar src={result?.avatar || "../assets/user.png"} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${result.name} (${result.id})`}
                                secondary={`${result.service && uc(result.service.name)}`}
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
                        placeholder="Search Employees.."
                        onChange={handleChange}
                    />
                    <IconButton type="button" sx={{ p: 1 }}>
                        <SearchIcon />
                    </IconButton>
                </Box>
            </>
            :<EmployeeTagged employee={employee} handleEmployeeSelection={handleEmployeeSelection}/>
        }
    </div>

}

const EmployeeTagged = ({employee, handleEmployeeSelection})=>{

    return <div style={{
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px'
    }}>
        <Avatar src={employee?.avatar || "../assets/user.png"}
                // onDoubleClick={navigate("/employee/"+employee.id)} // this is buggy as hell
        />
        <div style={{ marginLeft: '10px' }}>
            <Typography variant="h5" style={{fontWeight:500}}>{`${employee.name} (${employee.id})`}</Typography>
            <Typography variant="body2">{employee.email}</Typography>
        </div>
        <div >
            <Typography variant="title">{`${employee.service && uc(employee.service.name)}`}</Typography>
        </div>
        <IconButton onClick={() => { handleEmployeeSelection(null) }}>
            <CloseIcon />
        </IconButton>
    </div>
}

const OtherEmployeeTagged = ({employees, employee, handleEmployeeSelection})=>{

    return <div style={{
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px'
    }}>
        <Avatar src={employee?.avatar || "../assets/user.png"}
            // onDoubleClick={navigate("/employee/"+employee.id)} // this is buggy as hell
        />
        <div style={{ marginLeft: '10px' }}>
            <Typography variant="h5" style={{fontWeight:500}}>{`${employee.name} (${employee.id})`}</Typography>
            <Typography variant="body2">{employee.email}</Typography>
        </div>
        <div >
            <Typography variant="title">{`${employee.service && uc(employee.service.name)}`}</Typography>
        </div>
        <IconButton onClick={() => {
            const filteredEmployees = employees.filter(emp => emp.id !== employee.id);
            handleEmployeeSelection(filteredEmployees)
        }}>
            <CloseIcon />
        </IconButton>
    </div>
}

export function MultipleEmployeeTag({employees, handleEmployeesSelection}){
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const authAxios = useAuthRequest();
    const employeeService = createEmployeeService(authAxios)

    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [query, setQuery ] = useState("")
    const [employeeCount, setEmployeeCount] = useState(0)
    const limit = 3;

    useEffect(()=>{
        const fetchData = async ()=>{
            if(query){
                const response = await employeeService.search(query)
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
        setEmployeeCount(employees.length);
    },[employees])

    return <div style={{position:'relative'}}>
        { employeeCount < limit?
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
                    {searchResults.map((result, index) => (
                        <MenuItem key={index} onClick={() => {
                            console.log("Employees : ", employees)
                            const newEmployees = [...employees];
                            newEmployees.push(result)
                            handleEmployeesSelection(newEmployees)
                            setSearchResults([])
                            console.log("employeeCount", employeeCount);
                        }}>
                            <ListItemAvatar>
                                <Avatar src={result?.avatar || "../assets/user.png"} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${result.name} (${result.id})`}
                                secondary={`${result.service && uc(result.service.name)}`}
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
                        placeholder="Search Employees.."
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
            {employees.map((employee, index)=>{
                return <OtherEmployeeTagged employees={employees} employee={employee} handleEmployeeSelection={handleEmployeesSelection}/>
            })}
        </>
    </div>
}