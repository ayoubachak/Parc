import { useEffect, useState } from 'react';
import axios from 'axios';

function useAuthRequest(baseURL) {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token);
    }, []);

    const authAxios = axios.create({
        baseURL,
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    });

    return authAxios;
}

export default useAuthRequest;
