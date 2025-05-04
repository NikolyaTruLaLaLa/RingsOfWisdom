import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import dish from "./../assets/images/dish.png";
import icon_gendr_forms from "./../assets/images/icon_gendr_forms.png";
import many_faces from "./../assets/images/many_faces.png";
import reverse_x from "./../assets/images/reverse_x.png";

import "./../assets/style/style_skills_tree.css";
import QuizDayStats from "./../hooks/QuizDayStats";
import useQuizzesBySkill from "./../hooks/useQuizzesBySkill";
import ProtectedRoute from "../hooks/ProtectedRoute";
import MessageModal from '../components/message-modal/MessageModal'; 

const Strongformstree = () => {
  const skillName = "Могучие Формы";
  const quizzes = useQuizzesBySkill(skillName);
  const { availableQuizzes, totalQuizzes } = QuizDayStats();

  const [isPopupVisible, setPopupVisible] = useState(true);
  const [modalMessage, setModalMessage] = useState(null);

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleBlockedQuizClick = (quiz) => {
    setModalMessage({
      type: "error",
      text: `Этот квиз доступен только при статусе: ${quiz.requiredStatus || "неизвестен"}.`,
    });
  };

  const renderNavLink = (quiz) => {
    const completedQuiz = quizzes.find((q) => q.name === quiz.name);
  
    if (!completedQuiz) {
      return (
        <div className="cir-cont loading gray-circle">
          <div className="quiz-circle ">
            <img src={quiz.image} alt={quiz.name} />
          </div>
          <p>Загрузка...</p>
        </div>
      );
    }
  
    const isAccessible = completedQuiz.canAccess;
    const isCompleted = completedQuiz.isCompleted;
    const circleClass = isCompleted ? "green-circle" : "gray-circle";
  
    
  
    if (availableQuizzes === 0) {
      return (
        <div key={quiz.name} className={`cir-cont ${circleClass} quiz-disabled`}>
          <div className="quiz-circle">
            <img src={quiz.image} alt={quiz.name} />
          </div>
          <p>{quiz.name}</p>
        </div>
      );
    }
    if (!isAccessible) {
      return (
        <div
          key={quiz.name}
          className={`cir-cont gray-circle quiz-locked`}
          onClick={() => handleBlockedQuizClick(completedQuiz)}
          style={{ cursor: "not-allowed" }}
        >
          <div className="quiz-circle">
            <img src={quiz.image} alt={quiz.name} />
          </div>
          <p>{quiz.name}</p>
        </div>
      );
    }
  
    return (
      <NavLink to={quiz.path} className={`cir-cont ${circleClass}`}>
        <div className="quiz-circle">
          <img src={quiz.image} alt={quiz.name} />
        </div>
        <p>{quiz.name}</p>
      </NavLink>
    );
  };
  

  return (
    <ProtectedRoute>
      <div className="container_all">
        <div className="head">
          <p>
            Могучие Формы
            <br />
            <span className="quiz-counter">
              {availableQuizzes <= 0
                ? "Ваш лимит квизов в день закончился :( Они обновляются в 00:00 по Мск, либо можете купить попытки в нашем магазине!"
                : `Осталось квизов: ${availableQuizzes}/${totalQuizzes}`}
            </span>
          </p>
        </div>

        {isPopupVisible && (
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
          {renderNavLink({
            name: "ГЕНдерные Формы",
            image: icon_gendr_forms,
            path: "/quiz/ГЕНдерные Формы",
          })}
        </div>
        <div className="container_second">
          {renderNavLink({
            name: "Замена НЕизвестного",
            image: reverse_x,
            path: "/quiz/Замена НЕизвестного",
          })}
          {renderNavLink({
            name: "МногоЛикие",
            image: many_faces,
            path: "/quiz/МногоЛикие",
          })}
        </div>
        <div className="container_last">
          {renderNavLink({
            name: "Первые и Вторые блюда",
            image: dish,
            path: "/quiz/Первые и Вторые блюда",
          })}
        </div>
        {modalMessage && (
          <MessageModal message={modalMessage} onClose={() => setModalMessage(null)} />
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Strongformstree;
