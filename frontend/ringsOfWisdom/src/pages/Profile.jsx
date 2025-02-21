import React, { useState } from 'react';
import './../assets/style/style_profile.css'; // Стили для страницы профиля

const Profile = () => {
  const [userName, setUserName] = useState("Иван Иванов");
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("user@example.com");
  const [coins, setCoins] = useState(150);
  const [skills, setSkills] = useState([
    { name: "Навык 1", progress: 75 },
    { name: "Навык 2", progress: 50 },
    { name: "Навык 3", progress: 90 },
  ]);
  const [rating, setRating] = useState([
    { name: "Иван Иванов", score: 1000 },
    { name: "Петр Петров", score: 950 },
    { name: "Сидор Сидоров", score: 900 },
  ]);
  const [status, setStatus] = useState("Эксперт");

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Здесь можно добавить логику сохранения имени на сервере
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Профиль</h1>
      </div>

      <div className="profile-content">
        {/* Имя пользователя с возможностью переименования */}
        <div className="profile-section">
          <h2>Имя пользователя</h2>
          {isEditing ? (
            <div className="edit-name">
              <input
                type="text"
                value={userName}
                onChange={handleNameChange}
              />
              <button onClick={handleSaveClick}>Сохранить</button>
            </div>
          ) : (
            <div className="display-name">
              <span>{userName}</span>
              <button onClick={handleEditClick}>✏️</button>
            </div>
          )}
        </div>

        {/* Привязанная почта */}
        <div className="profile-section">
          <h2>Привязанная почта</h2>
          <p>{email}</p>
        </div>

        {/* Статистика кружками */}
        <div className="profile-section">
          <h2>Прогресс по навыкам</h2>
          <div className="skills-progress">
            {skills.map((skill, index) => (
              <div key={index} className="skill-circle">
                <div
                  className="circle"
                  style={{
                    background: `conic-gradient(#4caf50 ${skill.progress}%, #e0e0e0 ${skill.progress}% 100%)`,
                  }}
                >
                  <span>{skill.progress}%</span>
                </div>
                <p>{skill.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Рейтинговая статистика всех пользователей */}
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

        {/* Статус и монетки */}
        <div className="profile-section">
          <h2>Статус</h2>
          <p>{status}</p>
          <h2>Монетки</h2>
          <p>🪙 {coins}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;