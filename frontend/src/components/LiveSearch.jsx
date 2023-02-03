import {Box, IconButton, useTheme} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {tokens} from "../theme";
import {useState} from "react";


export default function LiveSearch(){
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [searchResults, setSearchResults] = useState([]);

    return <>
        <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="3px"
            width={"40%"}
        >
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
            <IconButton type="button" sx={{ p: 1 }}>
                <SearchIcon />
            </IconButton>
        </Box>

    </>
}
