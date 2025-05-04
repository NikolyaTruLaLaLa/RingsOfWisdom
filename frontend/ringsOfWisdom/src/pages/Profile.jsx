import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import money from "./../assets/images/monetka.png";
import "./../assets/style/style_profile.css";
import ProtectedRoute from "../hooks/ProtectedRoute";
import { useAuth } from './../hooks/AuthContext';
import MessageModal from '../components/message-modal/MessageModal'; 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
  const [modalMessage, setModalMessage] = useState(null);
  const { setIsAuthenticated, checkAuthStatus } = useAuth();
  const [allStatuses, setAllStatuses] = useState([]);
  const [nextStatusName, setNextStatusName] = useState(null);
  const [xpToNext, setXpToNext] = useState(0);
  const [showStatusInfo, setShowStatusInfo] = useState(false);
  const [currentXp, setCurrentXp] = useState(0);
  const [editedUserName, setEditedUserName] = useState("");

  useEffect(() => {
    fetchProfile();
    fetchTopPlayers();
    fetchUserRank();
    fetchStatuses();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/info`, {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        credentials: "include",
      });
      const data = await response.json();
      setUserName(data.username);
      setEmail(data.email);
      setCoins(data.balance);
      setStatus(data.status);
      setCurrentXp(data.xp);
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
      const response = await fetch(`${API_BASE_URL}/profile/top5`, {
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
      const response = await fetch(`${API_BASE_URL}/profile/rank`, {
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
      const response = await fetch(`${API_BASE_URL}/profile/change-username`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ NewUserName: editedUserName }),
      });
      const result = await response.json();

      if (response.ok) {
        setUserName(editedUserName);
        setIsEditing(false);
        fetchProfile(); 
        setModalMessage({type: "success",
          text: result.message || "Смена имени успешна"});
      } else {
        setModalMessage({type: "error",
      text: result.message || "Ошибка при смене имени."});
      }
    } catch (error) {
      setModalMessage({type: "error",
      text:"Ошибка при смене имени."});
    }
  };

  const handleLogout = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/Login/logout`, {
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

  const fetchStatuses = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/statuses`, {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        credentials: "include",
      });

      const data = await response.json();

      setAllStatuses(data.allStatuses);

      if (data.nextStatus) {
        setNextStatusName(data.nextStatus.name);
        setXpToNext(data.nextStatus.xpNeeded);
      } else {
        setNextStatusName(null);
        setXpToNext(0);
      }
    } catch (error) {
      console.error("Ошибка загрузки статусов:", error);
    }
  };

  const toggleStatusInfo = () => {
    setShowStatusInfo(!showStatusInfo);
  };

  const renderStatusInfo = () => {
    if (!showStatusInfo) return null;

    const columnSize = Math.ceil(allStatuses.length / 3);
    const columns = [[], [], []];
    
    allStatuses.forEach((statusObj, index) => {
      const columnIndex = Math.floor(index / columnSize);
      if (columnIndex < 3) {
        columns[columnIndex].push(statusObj);
      }
    });

    return (
      <div className="status-info-modal">
        <div className="status-info-content">
          <h3>Все статусы</h3>
          <div className="status-columns">
            {columns.map((column, colIndex) => (
              <div key={colIndex} className="status-column">
                {column.map((statusObj, index) => (
                  <div 
                    key={index} 
                    className={`status-item ${statusObj.name === status ? "current-status" : ""}`}
                  >
                    <div className="status-name">
                      {statusObj.name} 
                      {statusObj.name === status && <span className="you-are-here"> (Вы здесь)</span>}
                    </div>
                    <div className="status-xp">{statusObj.minXp} XP</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {nextStatusName && (
            <div className="next-status-info">
              Ближайший статус: <strong>{nextStatusName}</strong> (осталось {xpToNext} XP)
            </div>
          )}
          <button className="close-status-info" onClick={toggleStatusInfo}>
            Закрыть
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <ProtectedRoute>
        <div className="profile-container">
          <div className="profile-header">
            <h1>Профиль</h1>
          </div>

          <div className="profile-content">
            <div className="profile-section user-info">
              <div className="user-name-section">
                <h2>Данные Игрока</h2>
                  {isEditing ? (
                <div className="edit-name">
                  <input
                  type="text"
                   value={editedUserName}
                  onChange={(e) => setEditedUserName(e.target.value)}
                />
                <div className="edit-buttons">
                   <button onClick={handleSaveName}>Сохранить</button>
                   <button onClick={() => setIsEditing(false)} className="cancel-button">Отмена</button>
                </div>
              </div>
            ) : (
                <div className="display-name">
                  <div className="display-name-user-name">
                    {userName} 
                    <button className="change-name" onClick={() =>{setEditedUserName(userName); setIsEditing(true)}}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.06 9.02L14.98 9.94L5.92 19H5V18.08L14.06 9.02ZM17.66 3C17.41 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3ZM14.06 6.19L3 17.25V21H6.75L17.81 9.94L14.06 6.19Z" fill="#5A47B3"/>
                    </svg>
                    </button>
                  </div>
                <div className="display-name-status">
                  Статус: {status} 
                  <button className="status-info-button" onClick={toggleStatusInfo}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#5A47B3"/>
                    </svg>
                  </button>
                </div>
                <div className="display-name-xp">
                  Персональный опыт: {currentXp}
                </div>
                <div className="display-name-rank">
                  Место в глобальном рейтинге: {userRank ? `#${userRank}` : "не определено"}
                </div>
              </div>
              )}
              </div>
                <div className="coins-section">
                  <img src={money} alt="Монетки" className="money" />
                  <span>{coins}</span>
                </div>
            </div>

            {renderStatusInfo()}

            <div className="profile-section">
              <h2>Привязанная почта</h2>
              <div className="profile_email">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#5A47B3"/>
                </svg>
                <p>{email}</p>
              </div>
            </div>

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
          {modalMessage && (
          <MessageModal message={modalMessage} onClose={() => setModalMessage(null)} />
        )}
        </div>
      </ProtectedRoute>
    </>
  );
};

export default Profile;