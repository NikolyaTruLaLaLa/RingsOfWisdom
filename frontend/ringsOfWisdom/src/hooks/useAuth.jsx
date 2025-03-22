import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("token") ? true : null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("https://localhost:5269/api/Login/check-auth", { credentials: "include" });
        const data = await response.json();
        setIsAuthenticated(data.isAuthenticated);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated };
};