import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import profile from "./../assets/images/profile-icon.png";

const ProfileButton = () => {
    const { isAuthenticated, checkAuthStatus } = useAuth();

    if (isAuthenticated === null) {
        return <img src={profile} alt="Загрузка..." className="profile" />;
    }

    return (
        <NavLink to={isAuthenticated ? "/profile" : "/login"} onClick={checkAuthStatus}>
            <img src={profile} alt="Иконка профиля" className="profile" />
        </NavLink>
    );
};

export default ProfileButton;


