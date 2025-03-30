import { createContext, useContext, useEffect, useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    const checkAuthStatus = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/Login/check-auth`, {
                method: "GET",
                credentials: "include",
            });
            const data = await response.json();
            setIsAuthenticated(data.isAuthenticated);
        } catch (error) {
            console.error("Ошибка проверки авторизации:", error);
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, checkAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;