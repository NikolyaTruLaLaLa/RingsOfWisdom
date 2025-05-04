import React, { useState, useEffect } from "react"
import { NavLink } from 'react-router-dom';
import QuizDayStats from "./../hooks/QuizDayStats";
import ProtectedRoute from "../hooks/ProtectedRoute";
import MessageModal from '../components/message-modal/MessageModal'; 
import useQuizzesBySkill from "./../hooks/useQuizzesBySkill";

import './../assets/style/type_and_types.css';
import svoyak50 from './../assets/images/svoyak50.png';
import translate from './../assets/images/translate.png';
import choose from './../assets/images/choose.png';
import decompoziciya from './../assets/images/decompoziciya.png';
import singulyarnost from './../assets/images/singulyarnost.png';
import tooMuch from './../assets/images/tooMuch.png';
import addWater from './../assets/images/addWater.png';
import predposilki from './../assets/images/predposilki.png'; 
import redukciya from './../assets/images/redukciya.png';
import svoyak10 from './../assets/images/svoyak10.png';





const Take_or_No = () => {
    
  const skillName = "Возьмëшь не возьмëшь?";
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


      

      const renderNavLink_reduction = (quiz) => {
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
                    <p>Редукция до<br/>Очевидного</p>
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
                    <p>Редукция до<br/>Очевидного</p>
                  </div>
                );
              }
            
              return (
                <NavLink to={quiz.path} className="circle-typ-container">
                  <div className={`circle-typ ${circleClass}`}>
                    <img src={quiz.image} alt={quiz.name} />
                  </div>
                  <p>Редукция до<br/>Очевидного</p>
                </NavLink>
              );
            };

      const renderNavLink_sing = (quiz) => {
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
                    <p>Сингуляр<br/>ность</p>
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
                    <p>Сингуляр<br/>ность</p>
                  </div>
                );
              }
            
              return (
                <NavLink to={quiz.path} className="circle-typ-container">
                  <div className={`circle-typ ${circleClass}`}>
                    <img src={quiz.image} alt={quiz.name} />
                  </div>
                  <p>Сингуляр<br/>ность</p>
                </NavLink>
              );
            };

      const renderNavLink_choose = (quiz) => {
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
                    <p>Выбирай<br/>Правильно</p>
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
                    <p>Выбирай<br/>Правильно</p>
                  </div>
                );
              }
            
              return (
                <NavLink to={quiz.path} className="circle-typ-container">
                  <div className={`circle-typ ${circleClass}`}>
                    <img src={quiz.image} alt={quiz.name} />
                  </div>
                  <p>Выбирай<br/>Правильно</p>
                </NavLink>
              );
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
        <p>Возьмёшь не возьмёшь?
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
                           name: "Свояк за 10", image: svoyak10, path: "/quiz/Свояк за 10",
                         })}
        </div>

        
        <div className="skill-row">
        {renderNavLink_reduction({
                           name: "Редукция до Очевидного", image: redukciya, path: "/quiz/Редукция до Очевидного" ,
                         })}
        {renderNavLink({
                            name: "Предпосылки", image: predposilki, path: "/quiz/Предпосылки",
                         })}

        </div>

        <div className="skill-row">
        {renderNavLink({
                           name: "Добавь Воды", image: addWater, path: "/quiz/Добавь Воды",
                         })}
        {renderNavLink({
                           name: "Перебор", image: tooMuch, path: "/quiz/Перебор",
                         })}
        </div>

        <div className="skill-row">
        {renderNavLink_sing({
                            name: "Сингулярность", image: singulyarnost, path: "/quiz/Сингулярность",
                         })}
        {renderNavLink({
                           name: "Декомпозиция", image: decompoziciya, path: "/quiz/Декомпозиция",
                         })}
        </div>

        
        <div className="skill-row">
        {renderNavLink_choose({
                           name: "Выбирай Правильно", image: choose, path: "/quiz/Выбирай Правильно",
                         })}
        {renderNavLink({
                           name: "Перевод", image: translate, path: "/quiz/Перевод",
                         })}
        
        </div>

        
        <div className="skill-row">
        {renderNavLink({
                           name: "Свояк за 50", image: svoyak50, path: "/quiz/Свояк за 50" ,
                         })}
        </div>
    </div>
    {modalMessage && (
          <MessageModal message={modalMessage} onClose={() => setModalMessage(null)} />
        )}
    </ProtectedRoute>
    );
};
 
export default Take_or_No;