import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import money from "./../assets/images/monetka.png";
import "./../assets/style/style_profile.css";
import ProtectedRoute from "../hooks/ProtectedRoute";
import { useAuth } from './../hooks/AuthContext';

const API_BASE_URL = "https://localhost:5269/api/profile"; 

const Profile = () => {
  const [userName, setUserName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [coins, setCoins] = useState(0);
  const [status, setStatus] = useState("");
  const [skills, setSkills] = useState([]);
  const [rating, setRating] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const navigate = useNavigate();
  const { setIsAuthenticated, checkAuthStatus } = useAuth();

  useEffect(() => {
    fetchProfile();
    fetchTopPlayers();
    fetchUserRank();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      setUserName(data.userName);
      setEmail(data.email);
      setCoins(data.coins);
      setStatus(data.status);
      setSkills([
        { name: "Навык 1", progress: data.skills.Skill1 },
        { name: "Навык 2", progress: data.skills.Skill2 },
        { name: "Навык 3", progress: data.skills.Skill3 },
        { name: "Навык 4", progress: data.skills.Skill4 },
      ]);
    } catch (error) {
      console.error("Ошибка загрузки профиля:", error);
    }
  };

  const fetchTopPlayers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/top-players`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      setRating(data);
    } catch (error) {
      console.error("Ошибка загрузки топ-5 игроков:", error);
    }
  };

  const fetchUserRank = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/leaderboard-position`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      setUserRank(data.Rank);
    } catch (error) {
      console.error("Ошибка загрузки ранга:", error);
    }
  };

  const handleSaveName = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/update-username`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ newUserName: userName }),
      });

      if (response.ok) {
        setIsEditing(false);
        fetchProfile(); 
      } else {
        console.error("Ошибка при смене имени.");
      }
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  };

  const handleLogout = async () => {
    try {
        const response = await fetch("https://localhost:5269/api/Login/logout", {
            method: "POST",
            credentials: "include",
        });

        if (response.ok) {
            setIsAuthenticated(false);
            checkAuthStatus();
        } else {
            console.error("Ошибка при выходе");
        }
    } catch (error) {
        console.error("Ошибка сети при выходе:", error);
    }
};

  return (
    <>
      <ProtectedRoute>
        <div className="profile-container">
          <div className="profile-header">
            <h1>Профиль</h1>
          </div>

          <div className="profile-content">
            {/* Имя пользователя + Статус */}
            <div className="profile-section user-info">
              <div className="user-name-section">
                <h2>Имя пользователя</h2>
                {isEditing ? (
                  <div className="edit-name">
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    <button onClick={handleSaveName}>Сохранить</button>
                  </div>
                ) : (
                  <div className="display-name">
                    <span>
                      {userName} ({status}) {userRank && `#${userRank}`}
                    </span>
                    <button onClick={() => setIsEditing(true)}>✏️</button>
                  </div>
                )}
              </div>
              <div className="coins-section">
                <img src={money} alt="Монетки" className="money" />
                <span>{coins}</span>
              </div>
            </div>

            {/* Привязанная почта */}
            <div className="profile-section">
              <h2>Привязанная почта</h2>
              <p>{email}</p>
            </div>

            {/* Прогресс по навыкам */}
            <div className="profile-section">
              <h2>Прогресс по навыкам</h2>
              <div className="skills-progress">
                {skills.map((skill, index) => (
                  <div key={index} className="skill-circle">
                    <div
                      className="circle"
                      style={{
                        background: `conic-gradient(#5a47b3 ${skill.progress}%,rgb(250, 223, 202) ${skill.progress}% 100%)`,
                      }}
                    >
                      <span>{skill.progress}%</span>
                    </div>
                    <p>{skill.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Рейтинг пользователей */}
            <div className="profile-section">
              <h2>Рейтинг пользователей</h2>
              <table className="rating-table">
                <thead>
                  <tr>
                    <th>Место</th>
                    <th>Имя</th>
                    <th>Очки</th>
                    <th>Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {rating.map((user, index) => (
                    <tr key={index}>
                      <td>#{user.Rank}</td>
                      <td>{user.UserName}</td>
                      <td>{user.Score}</td>
                      <td>{user.Status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            
            <div className="profile-section">
              <button onClick={handleLogout}>Выйти из аккаунта</button>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
};

export default Profile;
