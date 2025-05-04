import React, { useState, useEffect } from "react"
import { NavLink } from 'react-router-dom';
import QuizDayStats from "./../hooks/QuizDayStats";
import ProtectedRoute from "../hooks/ProtectedRoute";

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


const quizData = [
  { name: "Свояк за 10", image: svoyak10, path: "/quiz/Свояк за 10" },
  { name: "Перевод", image: translate, path: "/quiz/Перевод" },
  { name: "Выбирай правильно", image: choose, path: "/quiz/Выбирай правильно" },
  { name: "Декомпозиция", image: decompoziciya, path: "/quiz/Декомпозиция" },
  { name: "Сингулярность", image: singulyarnost, path: "/quiz/Сингулярность" },
  { name: "Перебор", image: tooMuch, path: "/quiz/Перебор" },
  { name: "Добавь воды", image: addWater, path: "/quiz/Добавь воды" },
  { name: "Предпосылки", image: predposilki, path: "/quiz/Предпосылки" },
  { name: "Редукция до Очевидного", image: redukciya, path: "/quiz/Редукция до Очевидного" },
  { name: "Свояк за 50", image: svoyak50, path: "/quiz/Свояк за 50" }
];


const Take_or_No = () => {
    
    const {availableQuizzes, totalQuizzes} = QuizDayStats();
        useEffect(() => {
        }, []);
        
      const [isPopupVisible, setPopupVisible] = useState(true);
      
        const handleClosePopup = () => {
          setPopupVisible(false);
    
      };


      

      const renderNavLink_reduction = (quiz) => {
        if (availableQuizzes === 0) {
          return (
            <div className="circle-typ-container" >
            <div className="circle-typ">
              <img src={quiz.image} alt={quiz.name} />
              
            </div>
            <p>Редукция до<br/>Очевидного</p>
            </div>
          );
        } else {
          return (
            <NavLink to={quiz.path} className="circle-typ-container">
                <div className="circle-typ">
                    <img src={quiz.image} alt={quiz.name} />
                </div>
                <p>Редукция до<br/>Очевидного</p>
            </NavLink>
          );
        }
      };

      const renderNavLink_sing = (quiz) => {
        if (availableQuizzes === 0) {
          return (
            <div className="circle-typ-container" >
            <div className="circle-typ">
              <img src={quiz.image} alt={quiz.name} />
              
            </div>
            <p>Сингуляр<br/>ность</p>
            </div>
          );
        } else {
          return (
            <NavLink to={quiz.path} className="circle-typ-container">
                <div className="circle-typ">
                    <img src={quiz.image} alt={quiz.name} />
                </div>
                <p>Сингуляр<br/>ность</p>
            </NavLink>
          );
        }
      }; 

      const renderNavLink_choose = (quiz) => {
        if (availableQuizzes === 0) {
          return (
            <div className="circle-typ-container" >
            <div className="circle-typ">
              <img src={quiz.image} alt={quiz.name} />
              
            </div>
            <p>Выбирай<br/>Правильно</p>
            </div>
          );
        } else {
          return (
            <NavLink to={quiz.path} className="circle-typ-container">
                <div className="circle-typ">
                    <img src={quiz.image} alt={quiz.name} />
                </div>
                <p>Выбирай<br/>Правильно</p>
            </NavLink>
          );
        }
      }; 

      

      

      const renderNavLink = (quiz) => {
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
        {renderNavLink(quizData[0])}
        </div>

        
        <div className="skill-row">
        {renderNavLink(quizData[1])}
        {renderNavLink_choose(quizData[2])}
        </div>

        
        <div className="skill-row">
        {renderNavLink(quizData[3])}
        {renderNavLink_sing(quizData[4])}
        </div>

        
        <div className="skill-row">
        {renderNavLink(quizData[5])}
        {renderNavLink(quizData[6])}
        </div>

        
        <div className="skill-row">
        {renderNavLink(quizData[7])}
        {renderNavLink_reduction(quizData[8])}
        </div>

        
        <div className="skill-row">
        {renderNavLink(quizData[9])}
        </div>
    </div>
    </ProtectedRoute>
    );
};
 
export default Take_or_No;