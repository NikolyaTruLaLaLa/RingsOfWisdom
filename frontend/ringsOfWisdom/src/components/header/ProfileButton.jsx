import { useAuth } from "./../../hooks/AuthContext";
import { NavLink } from "react-router-dom";
import profile from "./../../assets/images/profile-icon.png";
import "./stylehead.css";

const ProfileButton = () => {
    const { isAuthenticated, checkAuthStatus } = useAuth();

    if (isAuthenticated === null) {
        return (
        <NavLink to="/auth" className="profile">
        <img src={profile} alt="Иконка профиля" />
        </NavLink>);
    }

    return (
        <NavLink to={isAuthenticated ? "/profile" : "/auth"} className="profile">
          <img src={profile} alt="Иконка профиля" />
        </NavLink>
    );
};

export default ProfileButton;


