import React, { useState, useEffect } from "react";
import money from "./../assets/images/monetka.png";
import "./../assets/style/style_profile.css";

const API_BASE_URL = "http://localhost:5000/api/profile"; //URL бэкенда

const Profile = () => {
  const [userName, setUserName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [coins, setCoins] = useState(0);
  const [status, setStatus] = useState("");
  const [skills, setSkills] = useState([
    { name: "Навык 1", progress: 0 },
    { name: "Навык 2", progress: 0 },
    { name: "Навык 3", progress: 0 },
    { name: "Навык 4", progress: 0 },
  ]);
  const [rating, setRating] = useState([]);
  const [userRank, setUserRank] = useState(null);

  // Получение профиля пользователя
  const fetchProfile = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/get-profile`, {
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

  // Получение топ-5 игроков
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

  // Получение места игрока в топе
  const fetchUserRank = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/leaderboard-position`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      setUserRank(data.Position);
    } catch (error) {
      console.error("Ошибка загрузки ранга:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchTopPlayers();
    fetchUserRank();
  }, []);

  // Смена имени пользователя
  const handleSaveClick = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/change-username`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(userName),
      });

      if (!response.ok) {
        throw new Error("Ошибка при изменении имени");
      }

      setIsEditing(false);
      fetchProfile(); // Обновляем данные
    } catch (error) {
      console.error("Ошибка сохранения имени:", error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Профиль</h1>
      </div>

      <div className="profile-content">
        {/* Имя пользователя с возможностью редактирования */}
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
                <button onClick={handleSaveClick}>Сохранить</button>
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
                <th>Имя</th>
                <th>Очки</th>
              </tr>
            </thead>
            <tbody>
              {rating.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
