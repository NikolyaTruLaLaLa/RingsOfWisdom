import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:5269/api/Login/check-auth", { credentials: "include" });
        const data = await response.json();
        if (!data.isAuthenticated) {
          navigate("/auth"); // Если не залогинен, редиректим на логин
        } else {
          setIsAuthenticated(true); // Пользователь залогинен
        }
      } catch (error) {
        navigate("/auth");
      }
    };

    checkAuth();
  }, [navigate]);

  if (isAuthenticated === null) {
    return <p>Проверка авторизации...</p>; // Пока идёт проверка !!!!!!Центрировать по размеру экрана!!!!!!
  }

  return children; // Если авторизован — рендерим контент
};

export default ProtectedRoute;