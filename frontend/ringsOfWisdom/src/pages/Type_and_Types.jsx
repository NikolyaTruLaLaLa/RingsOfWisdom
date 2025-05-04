import React, { useState, useEffect } from "react"
import { NavLink } from 'react-router-dom';
import QuizDayStats from "./../hooks/QuizDayStats";
import ProtectedRoute from "../hooks/ProtectedRoute";
import MessageModal from '../components/message-modal/MessageModal'; 
import useQuizzesBySkill from "./../hooks/useQuizzesBySkill";

import './../assets/style/type_and_types.css';
import baza from './../assets/images/baza.png';
import razdatka from './../assets/images/razdatka.png';
import zamena from './../assets/images/zamena.png';
import blatie_nomera from './../assets/images/blatie_nomera.png';
import razdatOCHKA from './../assets/images/razdatOCHKA.png';
import zamena_zamen from './../assets/images/zamena_zamen.png';
import svyazannye from './../assets/images/svyazannye.png';
import kot from './../assets/images/kot.png'; 
import frazochki from './../assets/images/frazochki.png';
import blitz from './../assets/images/blitz.png';

const Type_and_Types = () => {
    
  const skillName = "Типы и Типочки";
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


      const renderNavLink_kot = (quiz) => {
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
              <p>Кот в<br/>Чёрном Ящике</p>
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
              <p>Кот в<br/>Чёрном Ящике</p>
            </div>
          );
        }
      
        return (
          <NavLink to={quiz.path} className="circle-typ-container">
            <div className={`circle-typ ${circleClass}`}>
              <img src={quiz.image} alt={quiz.name} />
            </div>
            <p>Кот в<br/>Чёрном Ящике</p>
          </NavLink>
        );
      };

      const renderNavLink_frazochki = (quiz) => {
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
              <p>Странные<br/>фразочки</p>
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
              <p>Странные<br/>фразочки</p>
            </div>
          );
        }
      
        return (
          <NavLink to={quiz.path} className="circle-typ-container">
            <div className={`circle-typ ${circleClass}`}>
              <img src={quiz.image} alt={quiz.name} />
            </div>
            <p>Странные<br/>фразочки</p>
          </NavLink>
        );
      };


      const renderNavLink_zamena_zamen = (quiz) => {
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
              <p>Замена замен<br/>замены замен</p>
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
              <p>Замена замен<br/>замены замен</p>
            </div>
          );
        }
      
        return (
          <NavLink to={quiz.path} className="circle-typ-container">
            <div className={`circle-typ ${circleClass}`}>
              <img src={quiz.image} alt={quiz.name} />
            </div>
            <p>Замена замен<br/>замены замен</p>
          </NavLink>
        );
      };

      const renderNavLink_svyazannye = (quiz) => {
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
              <p>Связанные<br/>одной цепью</p>
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
              <p>Связанные<br/>одной цепью</p>
            </div>
          );
        }
      
        return (
          <NavLink to={quiz.path} className="circle-typ-container">
            <div className={`circle-typ ${circleClass}`}>
              <img src={quiz.image} alt={quiz.name} />
            </div>
            <p>Связанные<br/>одной цепью</p>
          </NavLink>
        );
      };


      const renderNavLink_blat = (quiz) => {
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
              <p>Блатные<br/>номера</p>
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
              <p>Блатные<br/>номера</p>
            </div>
          );
        }
      
        return (
          <NavLink to={quiz.path} className="circle-typ-container">
            <div className={`circle-typ ${circleClass}`}>
              <img src={quiz.image} alt={quiz.name} />
            </div>
            <p>Блатные<br/>номера</p>
          </NavLink>
        );
      };

    
      /*const renderNavLink = (quiz) => {
        if (availableQuizzes === 0) {
          return (
            <div className="circle-typ-container">
            <div className="circle-typ">
              <img src={quiz.image} alt={quiz.name} />
            </div>
            <p>{quiz.name}</p>
            </div>
          );
        } else {
          return (
            <NavLink to={quiz.path} className="circle-typ-container">
                <div className="circle-typ">
                    <img src={quiz.image} alt={quiz.name} />
                </div>
              <p>{quiz.name}</p>
            </NavLink>
          );
        }
      }; */


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
        <p>Типы и Типочки
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
                   name: "БАЗА", image: baza, path: "/quiz/БАЗА",
                 })}
        </div>

        
        <div className="skill-row">
        {renderNavLink({
                   name: "Раздатка", image: razdatka, path: "/quiz/Раздатка",
                 })}
        {renderNavLink({
                   name: "Замена", image: zamena, path: "/quiz/Замена",
                 })}
        </div>

        
        <div className="skill-row">
        {renderNavLink_blat({
                  name: "Блатные номера", image: blatie_nomera, path: "/quiz/Блатные номера",
                 })}
        {renderNavLink({
                   name: "РаздатоЧКА", image: razdatOCHKA, path: "/quiz/РаздатоЧКА",
                 })}
        </div>

        
        <div className="skill-row">
        {renderNavLink_zamena_zamen({
                   name: "Замена замен замены замен", image: zamena_zamen, path: "/quiz/Замена замен замены замен",
                 })}
        {renderNavLink_svyazannye({
                   name: "Связанные одной цепью", image: svyazannye, path: "/quiz/Связанные одной цепью",
                 })}
        </div>

        
        <div className="skill-row">
        {renderNavLink_kot({
                   name: "Кот в Чёрном Ящике", image: kot, path: "/quiz/Кот в Чёрном Ящике",
                 })}
        {renderNavLink_frazochki({
                   name: "Странные фразочки", image: frazochki, path: "/quiz/Странные фразочки",
                 })}
        </div>

        
        <div className="skill-row">
        {renderNavLink({
                   name: "БЛИЦ БЛИЦ БЛИЦ", image: blitz, path: "/quiz/БЛИЦ БЛИЦ БЛИЦ",
                 })}
        </div>
        {modalMessage && (
          <MessageModal message={modalMessage} onClose={() => setModalMessage(null)} />
        )}
    </div>
    </ProtectedRoute>
    );
};
 
export default Type_and_Types;