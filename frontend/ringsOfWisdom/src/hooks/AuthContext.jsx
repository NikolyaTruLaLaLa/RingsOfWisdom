import { createContext, useContext, useEffect, useState } from "react";

// Создаём контекст
const AuthContext = createContext();

// Хук для использования контекста
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // По умолчанию неизвестно

    // Функция для проверки авторизации
    const checkAuthStatus = async () => {
        try {
            const response = await fetch("http://localhost:5269/api/Login/check-auth", {
                method: "GET",
                credentials: "include", // Важно для передачи куков сессии
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
