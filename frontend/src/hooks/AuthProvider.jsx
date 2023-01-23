import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({"name":"", "lastname":""});
    const navigate = useNavigate();

    useEffect(() => {
        // Check for the presence of the token in local storage on initial render
        const token = localStorage.getItem('token');
        if (token) {
            // Verify the token with the server
            fetch('http://localhost:8080/user/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error(response.statusText);
                    }
                })
                .then(data => {
                    // If the token is valid, set the authenticated state and user data
                    setIsAuthenticated(true);
                    setLoading(false);
                    setUser(data);
                })
                .catch(error => {
                    console.error(error.message);
                    // If the token is not valid, remove it from local storage
                    localStorage.removeItem('token');
                    setLoading(false)
                });
        } else {
            setLoading(false);

        }
    }, []);
    const login = async (username, password) => {
        // Send a login request to the backend
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            // Extract the user data and the JWT from the response
            const data = await response.json();
            const { user, token } = data;

            // Store the JWT in local storage
            localStorage.setItem('token', token);

            // Update the authenticated state and the user data
            setIsAuthenticated(true);
            setUser(user);
            setLoading(false);
            navigate('/');

        } else {
            // Handle the error
            const error = await response.json();
            console.error(error.message);
        }
    }

    const logout = () => {
        // Remove the JWT from local storage
        localStorage.removeItem('token');

        // Update the authenticated state and the user data
        setIsAuthenticated(false);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
