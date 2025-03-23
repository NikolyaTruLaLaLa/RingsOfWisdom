import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import dish from "./../assets/images/dish.png";
import icon_gendr_forms from "./../assets/images/icon_gendr_forms.png";
import many_faces from "./../assets/images/many_faces.png";
import reverse_x from "./../assets/images/reverse_x.png";
import "./../assets/style/style_skills_tree.css";
import QuizDayStats from "./../hooks/QuizDayStats";
import ProtectedRoute from "../hooks/ProtectedRoute";
const API_BASE_URL = "https://localhost:5269/api";
const quizData = [
  { name: "ГЕНдерные Формы", image: icon_gendr_forms, path: "/quiz/ГЕНдерные Формы" },
  { name: "Замена НЕизвестного", image: reverse_x, path: "/quiz/Замена НЕизвестного" },
  { name: "МногоЛикие", image: many_faces, path: "/quiz/МногоЛикие" },
  { name: "Первые и Вторые блюда", image: dish, path: "/quiz/Первые и Вторые блюда" }
];

const Strongformstree = () => {

    const {availableQuizzes, totalQuizzes} = QuizDayStats();
    useEffect(() => {
    }, []); 
    
  const [isPopupVisible, setPopupVisible] = useState(true);

  const handleClosePopup = () => {
    setPopupVisible(false);

  };

  const renderNavLink = (quiz) => {
    if (availableQuizzes === 0) {
      return (
        <div className="item disabled">
          <img src={quiz.image} alt={quiz.name} />
          <p>{quiz.name}</p>
        </div>
      );
    } else {
      return (
        <NavLink to={quiz.path} className="item">
          <img src={quiz.image} alt={quiz.name} />
          <p>{quiz.name}</p>
        </NavLink>
      );
    }
  };
  return (
    <ProtectedRoute>
    <div className="container_all">
  <div className="head">
    <p>Могучие Формы
      <br/>
      <span className="quiz-counter">{availableQuizzes <= 0 ? "Ваш лимит квизов в день закончился :( Они обновляются в 00:00 по Мск, либо можете купить попытки в нашем магазине!" 
      : `Осталось квизов: ${availableQuizzes}/${totalQuizzes}`}</span>
    </p>
  </div>

  {/* Для больших экранов (>= 1025px) */}
  {window.innerWidth > 1025 && isPopupVisible && (
    <div className="popupwin">
      <div className="popupwin-content">
        <span className="close-btn" onClick={handleClosePopup}>
          &times;
        </span>
        <p>
          При переходе на квиз, считывается попытка квиза в день. Пройденным - квиз считается после взятия любых 2-ух вопросов.
        </p>
      </div>
    </div>
  )}

    <div className="container_first">
          {renderNavLink(quizData[0])}
        </div>
        <div className="container_second">
          {renderNavLink(quizData[1])}
          {renderNavLink(quizData[2])}
        </div>
        <div className="container_last">
          {renderNavLink(quizData[3])}
        </div>

  {/* Для экранов меньше 1025px */}
  {window.innerWidth <= 1025 && isPopupVisible && (
    <div className="popupwin">
      <div className="popupwin-content">
        <span className="close-btn" onClick={handleClosePopup}>
          &times;
        </span>
        <p>
          При переходе на квиз, считывается попытка квиза в день. Пройденным - квиз считается после взятия любых 2-ух вопросов.
        </p>
      </div>
    </div>
  )}
</div>
</ProtectedRoute>
  );
};

export default Strongformstree;