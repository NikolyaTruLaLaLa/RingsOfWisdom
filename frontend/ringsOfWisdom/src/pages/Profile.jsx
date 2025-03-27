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
  const [message, setMessage] = useState("");
  const { setIsAuthenticated, checkAuthStatus } = useAuth();

  useEffect(() => {
    fetchProfile();
    fetchTopPlayers();
    fetchUserRank();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/info`, {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        credentials: "include",
      });
      const data = await response.json();
      setUserName(data.username);
      setEmail(data.email);
      setCoins(data.balance);
      setStatus(data.status);
      if (data.progress && typeof data.progress === "object") {
        const formattedSkills = Object.entries(data.progress).map(([key, value]) => {
          return {
            name: key.trim(),
            progress: Number(value) || 0,
          };
        });
  
        setSkills(formattedSkills);
      } else {
        console.log("Прогресс отсутствует или неверный формат");
        setSkills([]);
      }
    } catch (error) {
      console.error("Ошибка загрузки профиля:", error);
    }
  };

  const fetchTopPlayers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/top5`, {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Ошибка загрузки топ-5 игроков");

      const data = await response.json();

      if (Array.isArray(data)) {
        setRating(
          data.map((player, index) => ({
            Rank: index + 1,
            UserName: player.username || "Неизвестный",
            Score: player.xp || 0,
            Status: player.status || "Без статуса",
          }))
        );
      } else {
        console.warn("Данные топ-5 игроков пришли в неожиданном формате", data);
        setRating([]);
      }
    } catch (error) {
      console.error("Ошибка загрузки топ-5 игроков:", error);
    }
};


  
  

  const fetchUserRank = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/rank`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        credentials: "include",
      });
      const data = await response.json();
      setUserRank(data.rank);
    } catch (error) {
      console.error("Ошибка загрузки ранга:", error);
    }
  };

  const handleSaveName = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/change-username`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ NewUserName: userName }),
      });

      if (response.ok) {
        setIsEditing(false);
        fetchProfile(); 
      } else {
        setMessage("Ошибка при смене имени.");
      }
    } catch (error) {
      setMessage("Ошибка при смене имени.");
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
                <h2>Данные Игрока</h2>
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
                      {userName} <br/>  Статус: {status} <br/> Место в глобальном рейтинге: {userRank ? `#${userRank}` : "не определено"}
                    </span>
                    <button className="change-name" onClick={() => setIsEditing(true)}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.06 9.02L14.98 9.94L5.92 19H5V18.08L14.06 9.02ZM17.66 3C17.41 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3ZM14.06 6.19L3 17.25V21H6.75L17.81 9.94L14.06 6.19Z" fill="#5A47B3"/>
                </svg></button>
                  </div>
                )}
              </div>
              <div className="coins-section">
                <img src={money} alt="Монетки" className="money" />
                <span>{coins}</span>
              </div>
              {message && <p>{message}</p>}
            </div>

            {/* Привязанная почта */}
            <div className="profile-section">
              <h2>Привязанная почта</h2>
              <div className="profile_email">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#5A47B3"/>
              </svg>
              <p>{email}</p>
              </div>
            </div>

            {/* Прогресс по навыкам */}
            <div className="profile-section">
              <h2>Прогресс по навыкам</h2>
                <div className="skills-progress">
                  {skills.length > 0 ? (
                    skills.map((skill, index) => (
                    <div key={index} className="skill-circle">
                      <div
                          className="circle"
                          style={{background: `conic-gradient(#5a47b3 ${skill.progress}%, rgb(239, 225, 213) ${skill.progress}% 100%)`,}}
                      >
                        <span>{skill.progress}%</span>
                      </div>
                      <p>{skill.name}</p>
                    </div>
                      ))
                    ) : (
                      <p>Нет данных по навыкам</p>
                     )}
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
                      <td className="number-men">#{user.Rank}</td>
                      <td>{user.UserName}</td>
                      <td>{user.Score}</td>
                      <td>{user.Status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            
            <div className="profile-section">
              <button className="logout" onClick={handleLogout}>Выйти из аккаунта  
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" fill="white"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
};

export default Profile;
