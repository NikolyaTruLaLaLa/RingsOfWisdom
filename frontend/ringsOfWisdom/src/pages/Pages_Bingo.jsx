import React, { useState, useEffect } from "react"
import { NavLink } from 'react-router-dom';
import QuizDayStats from "./../hooks/QuizDayStats";
import ProtectedRoute from "../hooks/ProtectedRoute";
import MessageModal from '../components/message-modal/MessageModal'; 
import useQuizzesBySkill from "./../hooks/useQuizzesBySkill";

import './../assets/style/type_and_types.css';
import pushkin from './../assets/images/pushkin.png';
import gari from './../assets/images/gari.png'; 
import Greece from './../assets/images/Greece.png';
import imageForBingo from './../assets/images/imageForBingo.png';
import biblia from './../assets/images/biblia.png';
import literature from './../assets/images/literature.png';
import town from './../assets/images/town.png';
import science from './../assets/images/science.png'; 
import rus from './../assets/images/rus.png';
import Factы from './../assets/images/Factы.png';

const Pages_Bingo = () => {
    
  const skillName = "Это Бинго!";
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
                  <div className="circle-typ-container">
                    <div className="circle-typ loading gray-circle">
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
                  <div key={quiz.name} className="circle-typ-container">
                    <div className={`circle-typ ${circleClass} quiz-disabled`}>
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
                    className="circle-typ-container"
                    onClick={() => handleBlockedQuizClick(completedQuiz)}
                    style={{ cursor: "not-allowed" }}
                  >
                    <div className={`circle-typ gray-circle quiz-locked`}>
                      <img src={quiz.image} alt={quiz.name} />
                    </div>
                    <p>{quiz.name}</p>
                  </div>
                );
              }
            
              return (
                <NavLink to={quiz.path} className="circle-typ-container">
                  <div className={`circle-typ ${circleClass}`}>
                    <img src={quiz.image} alt={quiz.name} />
                  </div>
                  <p>{quiz.name}</p>
                </NavLink>
              );
            };

    return (
        <ProtectedRoute>
        <div className="skill-tree">
    <div className="page-title">
        <p>Это бинго!
            <br/>
        <span className="quiz-counter">
        {availableQuizzes <= 0 
        ? "Ваш лимит квизов в день закончился :( Они обновляются в 00:00 по Мск, либо можете купить попытки в нашем магазине!" 
        : `Осталось квизов: ${availableQuizzes}/${totalQuizzes}`}</span>
        </p>
    </div>
    {isPopupVisible && (
    <div className="popupwintyp">
    <div className="popupwintyp-content">
      <span className="close-btn" onClick={handleClosePopup}>
        &times;
      </span>
      <p>
        При переходе на квиз, считывается попытка квиза в день. Пройденным - квиз считается после взятия любых 2-ух вопросов.
      </p>
    </div>
  </div>
  )}

       
        <div className="skill-row">
         {renderNavLink({
                           name: "Пушкин", image: pushkin, path: "/quiz/Пушкин",
                         })}
        </div>

        
        <div className="skill-row">
        {renderNavLink({
                           name: "Гарри", image: gari, path: "/quiz/Гарри",
                         })}
         {renderNavLink({
                          name: "Греция", image: Greece, path: "/quiz/Греция",
                         })}
        </div>

        
        <div className="skill-row">
        {renderNavLink({
                           name: "Картинки", image: imageForBingo, path: "/quiz/Картинки",
                         })}
         {renderNavLink({
                           name: "Библия", image: biblia, path: "/quiz/Библия",
                         })}
        </div>

        
        <div className="skill-row">
        {renderNavLink({
                           name: "Литература", image: literature, path: "/quiz/Литература",
                         })}
         {renderNavLink({
                          name: "Городки", image: town, path: "/quiz/Городки",
                         })}
        </div>

        
        <div className="skill-row">
        {renderNavLink({
                           name: "Навуки", image: science, path: "/quiz/Навуки",
                         })}
         {renderNavLink({
                           name: "Про Русов", image: rus, path: "/quiz/Про Русов",
                         })}
        </div>

        <div className="skill-row">
        {renderNavLink({
                           name: "Factы", image: Factы, path: "/quiz/Factы",
                         })}
        </div>
        {modalMessage && (
          <MessageModal message={modalMessage} onClose={() => setModalMessage(null)} />
        )}
    </div>
    </ProtectedRoute>
    );
};
 
export default Pages_Bingo;