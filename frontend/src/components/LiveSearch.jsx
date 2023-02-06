import {Box, Card, CardContent, CardMedia, Checkbox, IconButton, Typography, useTheme} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {tokens} from "../theme";
import React, {useEffect, useState} from "react";
import useAuthRequest from "../hooks/useAuthRequest";
import {createEmployeeService, createVehicleService} from "../services/services";
import FormControlLabel from "@mui/material/FormControlLabel";
import defaultAvatar from '../assets/user.png';
import {useNavigate} from "react-router-dom";


const searchWorkers = ({authRequest}) => {
    return [
        {
            filter: "Vehicle",
            redirect:"/vehicle/",
            isChecked: 1,
            resultsTitle: "Vehicle Results",
            FilterCheckbox: function() {
                return (
                    <FormControlLabel
                        control={<Checkbox color="primary" />}
                        label="Vehicle"
                        value={this.isChecked }
                        onChange={() => {
                            this.isChecked = this.isChecked===0?1:0;
                            this.showSearchResults = !this.showSearchResults;
                            console.log("this.showSearchResults form click", this.showSearchResults)
                        }}
                    />
                );
            },
            searchService: createVehicleService(authRequest),
            searchResults: [],
            showSearchResults: true,
            RenderResults: function({navigate, showResultsHandler}) {

                return (<>
                    <h2>{this.resultsTitle} :</h2>
                    <>
                        {this.searchResults.length >= 1 ? <div style={{ overflow: "scroll", paddingLeft: "15px",  display: "flex", flexDirection: "row", position:"absolute" ,bottom:"30px"}}>
                                {
                                    this.searchResults.map((searchResult, index) => {
                                        return (
                                            <Card key={index} style={{width: "200px", marginRight: "20px" ,
                                                justifyContent: "center",
                                                display: "flex",
                                                alignItems: "center",
                                                flexDirection: "column"
                                            }}
                                              onClick={()=>{
                                                  showResultsHandler(false)
                                                  navigate(this.redirect+searchResult.id)
                                              }}
                                            >
                                                <CardMedia
                                                    image={searchResult.avatar || defaultAvatar}
                                                    style={{height: "150px"}}
                                                />
                                                <CardContent>
                                                    <div key={index} style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", textAlign:"center"}}>
                                                        <div style={{width:"200px", fontWeight:600}} > {(searchResult.brandModel.brand && searchResult.brandModel.brand.name) + " " + searchResult.brandModel.name}</div>
                                                        <div style={{width:"200px"}}>Liscence: {searchResult.liscence}</div>
                                                        <div style={{width:"200px"}}>Fuel Type: {searchResult.fuelType.name}</div>
                                                        <div style={{width:"200px"}}>Service: {searchResult.service && searchResult.service.name}</div>
                                                        <div style={{width:"200px"}}>Model: {searchResult.model}</div>
                                                        <div style={{width:"200px"}}>Number of Chairs: {searchResult.numchairs}</div>
                                                        <div style={{width:"200px"}}>Power: {searchResult.power}</div>
                                                        {/*<div style={{width:"200px"}}>Vehicle Kilometres: {searchResult.vehkm}</div>*/}
                                                        {/*<div style={{width:"200px"}}>Category: {searchResult.category.name}</div>*/}
                                                        {/*<div style={{width:"200px"}}>Service: {searchResult.service.name}</div>*/}
                                                        {/*{searchResult.reparation && <>*/}
                                                        {/*    <div style={{width:"200px"}}>Reparation Bill: {searchResult.reparation.bill}</div>*/}
                                                        {/*    <div style={{width:"200px"}}>Reparation Distance: {searchResult.reparation.distance}</div>*/}
                                                        {/*    <div style={{width:"200px"}}>Reparation Date: {searchResult.reparation.reparationDate}</div>*/}
                                                        {/*    <div style={{width:"200px"}}>Reparation Reference: {searchResult.reparation.reparationReference}</div>*/}
                                                        {/*    <div style={{width:"200px"}}>Reparation Type: {searchResult.reparation.reparationDetails.type}</div>*/}
                                                        {/*    <div style={{width:"200px"}}>Reparation Price: {searchResult.reparation.reparationDetails.price}</div>*/}
                                                        {/*</>}*/}
                                                    </div>
                                                </CardContent>
                                            </Card>

                                        );
                                    })
                                }
                            </div>
                            : (
                                <h3>No Results</h3>
                            )}
                    </>
                </>);
            },

            getResults: async function(query) {
                const results = await this.searchService.search(query);
                const data = results.data;
                console.log(data);
                return data;
            }
        },
        {
            filter: "Employee",
            redirect:"/employee/",
            isChecked: 1,
            resultsTitle: "Employee Results",
            FilterCheckbox: function() {
                return (
                    <FormControlLabel
                        control={<Checkbox color="primary" />}
                        label="Employee"
                        value={this.isChecked}
                        onChange={() => {
                            this.isChecked = this.isChecked===0?1:0;
                            this.showSearchResults = !this.showSearchResults;
                            console.log("this.showSearchResults form click", this.showSearchResults)
                        }}
                    />
                );
            },
            searchService: createEmployeeService(authRequest),
            searchResults: [],
            showSearchResults: true,
            RenderResults: function({navigate, showResultsHandler}) {

                return (<>
                    <h2>{this.resultsTitle} :</h2>
                    {this.searchResults.length >= 1 ?
                        <div style={{ overflow: "scroll", paddingLeft: "15px",  display: "flex", flexDirection: "row", position:"absolute" ,bottom:"-20px" }}>
                            {
                                this.searchResults.map((searchResult, index) => {
                                    return (
                                        <Card
                                            sx={{ width: "200px", height: "350px", m: "1rem" }}
                                            key={index} style={{ marginRight: "20px",
                                            justifyContent: "center",
                                            display: "flex",
                                            alignItems: "center",
                                            flexDirection: "column"
                                        }}
                                        onClick={()=>{
                                            showResultsHandler(false)
                                            navigate(this.redirect+searchResult.id)
                                        }}
                                        >
                                            <CardMedia
                                                image={searchResult.avatar || defaultAvatar}
                                                style={{height: "150px", width:"150px"}}
                                            />
                                            <CardContent>
                                                <Typography variant="h4" >
                                                    {searchResult.name}
                                                </Typography>
                                                <Typography variant="h6" >
                                                    {searchResult.email}
                                                </Typography>
                                                <Typography variant="body2">
                                                    Function: {searchResult.function}
                                                </Typography>
                                                {searchResult.service &&  <>
                                                    <Typography variant="body2">
                                                        Service: {searchResult.service.name}
                                                    </Typography>
                                                </>
                                                }
                                            </CardContent>
                                        </Card>
                                    );
                                })
                            }
                        </div>
                        : (
                            <h3>No Results</h3>
                        )}
                </>);
            },
            getResults: async function(query) {
                const results = await this.searchService.search(query);
                const data = results.data;
                console.log(data);
                return data;
            }
        }
    ];
};



export default function LiveSearch(){
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const navigate = useNavigate();
    const authRequest = useAuthRequest();
    // these are the 3 things we'll be searching with, if you want more, you can add more
    const [workers, setWorkers] = useState(searchWorkers({authRequest}));

    const [showResults, setShowResults ] = useState(false);
    const [renderedResults, setRenderedResults] = useState([])
    const [query, setQuery ] = useState("")

    const showResultsHandler = (visibility)=>{
        setShowResults(visibility)
    }

    useEffect(()=>{
        const fetchData = async ()=>{
            if(query){
                setShowResults(true)
                setRenderedResults([])
                let workerRenderedResultList = []
                for (let worker of workers) {
                    if(worker.isChecked){
                        const workerSearchResults = await worker.getResults(query);
                        worker.searchResults = workerSearchResults;
                        let workerRenderedResults = worker.RenderResults({navigate, showResultsHandler});
                        workerRenderedResultList.push(workerRenderedResults)
                    }
                }
                console.log("workerRenderedResultList",workerRenderedResultList)
                setRenderedResults(workerRenderedResultList)
            }else{
                setShowResults(false)
            }
        }
        fetchData();
    },[query])

    return <Box
        display={"flex"}
        position={"relative"}
        flexDirection={"column"}
        width={"50%"}

    >
        <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="3px"
        >
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search"
                       onChange={(event) => { setQuery(event.target.value); console.log(query) }}
            />
            <IconButton type="button" sx={{ p: 1 }}>
                <SearchIcon />
            </IconButton>
        </Box>
        {showResults ?<>
            <Box position="absolute" top="45px" backgroundColor={colors.primary[400]} borderRadius={5} padding={"10px"} overflow={"scroll"} height={"600px"} zIndex={100}>
                <h4 style={{marginLeft:"15px"}}>filters:</h4>
                <div style={{ width: "200px", overflowX: "scroll", paddingLeft:"15px",backgroundColor:colors.primary[400] ,display:"flex",flexDirection:"row"}}>
                    {workers.map((worker, index) => { return <div key={index}>{worker.FilterCheckbox()}</div> })}
                </div>
                <h1 style={{marginLeft:"15px"}}>Here are the Top Results:</h1>
                <SearchResultBox renderedResults={renderedResults} workers={workers} />
                </Box>
            </>:
            <></>

        }


    </Box>
}

const SearchResultBox = ({renderedResults, workers})=>{
    return <div style={{padding:"0px 15px 15px 15px" }}>
            {renderedResults.map((renderedResult, index)=>{
                return <div key={index} style={{ overflowX: "scroll", width:"500px", position:"relative" , height:"450px"}}>
                    {renderedResult}
                </div>
            })}
    </div>
}