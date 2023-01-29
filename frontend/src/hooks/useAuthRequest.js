import axios from 'axios';

function useAuthRequest(baseURL = 'http://localhost:8080/') {

    const token = localStorage.getItem('token');

    return axios.create({
        baseURL,
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    });
}

export default useAuthRequest;
