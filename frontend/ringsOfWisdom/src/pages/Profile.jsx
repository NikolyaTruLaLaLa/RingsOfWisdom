import React, { useState } from 'react';
import money from "./../assets/images/monetka.png";
import './../assets/style/style_profile.css'; // Стили для страницы профиля

const Profile = () => {
  const [userName, setUserName] = useState("Иван Иванов");
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("user@example.com");
  const [coins, setCoins] = useState(150);
  const [skills, setSkills] = useState([
    { name: "Навык 1", progress: 0 },
    { name: "Навык 2", progress: 10 },
    { name: "Навык 3", progress: 30 },
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
        {/* Имя пользователя с возможностью переименования и монетки */}
        <div className="profile-section user-info">
          <div className="user-name-section">
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
                <span>{userName} ({status})</span>
                <button onClick={handleEditClick}>✏️</button>
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

        {/* Статистика кружками */}
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
      </div>
    </div>
  );
};

export default Profile;