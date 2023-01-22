import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check for the presence of the token in local storage on initial render
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
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
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
