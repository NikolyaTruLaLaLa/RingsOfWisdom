import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/auth");
    } else if (isAuthenticated !== null) {
      setLoading(false);
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated === null || loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "20px"
      }}>
        Проверка авторизации...
      </div>
    );
  }

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
