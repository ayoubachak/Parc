import { IconButton} from "@mui/material";
import { useContext } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../../hooks/AuthProvider';
import { useNavigate } from 'react-router-dom';


const Logout = () => {

    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
            <IconButton onClick={handleLogout}>
                <LogoutIcon />
            </IconButton>
    );
};

export default Logout;
