import { createContext, useContext, useEffect, useState } from "react";

// Создаём контекст
const AuthContext = createContext();

// Хук для использования контекста
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    // Функция для проверки авторизации
    const checkAuthStatus = async () => {
        try {
            const response = await fetch("https://localhost:5269/api/Login/check-auth", {
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

    // Запускаем проверку при загрузке страницы
    useEffect(() => {
        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, checkAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
