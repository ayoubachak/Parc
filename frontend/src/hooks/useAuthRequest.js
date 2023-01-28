import { useEffect, useState } from 'react';
import axios from 'axios';

function useAuthRequest(baseURL) {

    const token = localStorage.getItem('token');

    const authAxios = axios.create({
        baseURL,
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    });

    return authAxios;
}

export default useAuthRequest;
