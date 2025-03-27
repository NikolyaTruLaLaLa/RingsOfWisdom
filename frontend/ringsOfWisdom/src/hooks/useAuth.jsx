import { useState, useEffect } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("token") ? true : null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/Login/check-auth`, { credentials: "include" });
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