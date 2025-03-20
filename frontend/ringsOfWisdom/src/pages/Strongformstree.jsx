import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import useQuizzes from "./../hooks/UseQuizzes";
import dish from "./../assets/images/dish.png";
import icon_gendr_forms from "./../assets/images/icon_gendr_forms.png";
import many_faces from "./../assets/images/many_faces.png";
import reverse_x from "./../assets/images/reverse_x.png";
import "./../assets/style/style_skills_tree.css";
import QuizDayStats from "./../hooks/QuizDayStats";
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

  return (
    <div className="container_all">
  <div className="head">
    <p>Могучие Формы
      <br/>
      <span className="quiz-counter">{availableQuizzes === 0 ? "Ваш лимит квизов в день закончился :( Они обновляются в 00:00 по Мск, либо можете купить попытки в нашем магазине!" 
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
    <NavLink to={quizData[0].path} className="item">
      <img src={quizData[0].image} alt={quizData[0].name} />
      <p>{quizData[0].name}</p>
    </NavLink>
  </div>
  <div className="container_second">
    <NavLink to={quizData[1].path} className="item">
      <img src={quizData[1].image} alt={quizData[1].name} />
      <p>{quizData[1].name}</p>
    </NavLink>
    <NavLink to={quizData[2].path} className="item">
      <img src={quizData[2].image} alt={quizData[2].name} />
      <p>{quizData[2].name}</p>
    </NavLink>
  </div>
  <div className="container_last">
    <NavLink to={quizData[3].path} className="item">
      <img src={quizData[3].image} alt={quizData[3].name} />
      <p>{quizData[3].name}</p>
    </NavLink>
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
  );
};

export default Strongformstree;