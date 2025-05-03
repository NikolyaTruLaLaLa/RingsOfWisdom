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
  { name: "Свояк за 50", image: svoyak50, path: "/quiz/БАЗА" },
  { name: "Перевод", image: translate, path: "/quiz/Раздатка" },
  { name: "Выбирай правильно", image: choose, path: "/quiz/Замена" },
  { name: "Декомпозиция", image: decompoziciya, path: "/quiz/Блатные номера" },
  { name: "Сингулярность", image: singulyarnost, path: "/quiz/РаздатоЧКА" },
  { name: "Перебор", image: tooMuch, path: "/quiz/Замена замен замены замен" },
  { name: "Добавь воды", image: addWater, path: "/quiz/Связанные одной цепью" },
  { name: "Предпосылки", image: predposilki, path: "/quiz/Кот в Чёрном Ящике" },
  { name: "Редукция до Очевидного", image: redukciya, path: "/quiz/Странные фразочки" },
  { name: "Свояк за 10", image: svoyak10, path: "/quiz/БЛИЦ БЛИЦ БЛИЦ" }
];


const Type_and_Types = () => {
    
    const {availableQuizzes, totalQuizzes} = QuizDayStats();
        useEffect(() => {
        }, []);
        
      const [isPopupVisible, setPopupVisible] = useState(true);
      
        const handleClosePopup = () => {
          setPopupVisible(false);
    
      };


      const renderNavLink_svoyak10 = (quiz) => {
        if (availableQuizzes === 0) {
          return (
            <div className="circle-typ-container" >
            <div className="circle-typ">
              <img src={quiz.image} alt={quiz.name} />
              
            </div>
            <p>Свояк за 10</p>
            </div>
          );
        } else {
          return (
            <NavLink to={quiz.path} className="circle-typ-container" >
                <div className="circle-typ">
                    <img src={quiz.image} alt={quiz.name} />
                </div>
                <p>Свояк за 10</p>
            </NavLink>
          );
        }
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


      const renderNavLink_predposilki = (quiz) => {
        if (availableQuizzes === 0) {
          return (
            <div className="circle-typ-container" >
                <div className="circle-typ" >
                  <img src={quiz.image} alt={quiz.name} />
                 
                </div>
                <p>Предпосылки</p>
            </div>
          );
        } else {
          return (
            <NavLink to={quiz.path} className="circle-typ-container">
                <div className="circle-typ">
                    <img src={quiz.image} alt={quiz.name} />
                </div>
                <p>Предпосылки</p>
            </NavLink>
          );
        }
      }; 

      const renderNavLink_addWater = (quiz) => {
        if (availableQuizzes === 0) {
          return (
            <div className="circle-typ-container" >
            <div className="circle-typ">
              <img src={quiz.image} alt={quiz.name} />
              
            </div>
            <p>Добавь<br/>Воды</p>
            </div>
          );
        } else {
          return (
            <NavLink to={quiz.path} className="circle-typ-container">
                <div className="circle-typ">
                    <img src={quiz.image} alt={quiz.name} />
                </div>
                <p>Добавь<br/>Воды</p>
            </NavLink>
          );
        }
      }; 

      const renderNavLink_tooMuch = (quiz) => {
        if (availableQuizzes === 0) {
          return (
            <div className="circle-typ-container" >
            <div className="circle-typ">
              <img src={quiz.image} alt={quiz.name} />
              
            </div>
            <p>Перебор</p>
            </div>
          );
        } else {
          return (
            <NavLink to={quiz.path} className="circle-typ-container">
                <div className="circle-typ">
                    <img src={quiz.image} alt={quiz.name} />
                </div>
                <p>Перебор</p>
            </NavLink>
          );
        }
      }; 

      const renderNavLink_singulyarnost = (quiz) => {
        if (availableQuizzes === 0) {
          return (
            <div className="circle-typ-container" >
            <div className="circle-typ">
              <img src={quiz.image} alt={quiz.name} />
              
            </div>
            <p>Сингулярность</p>
            </div>
          );
        } else {
          return (
            <NavLink to={quiz.path} className="circle-typ-container">
                <div className="circle-typ">
                    <img src={quiz.image} alt={quiz.name} />
                </div>
                <p>Сингулярность</p>
            </NavLink>
          );
        }
      }; 

      const renderNavLink_decompozition = (quiz) => {
        if (availableQuizzes === 0) {
          return (
            <div className="circle-typ-container" >
            <div className="circle-typ">
              <img src={quiz.image} alt={quiz.name} />
              
            </div>
            <p>Декомпозиция</p>
            </div>
          );
        } else {
          return (
            <NavLink to={quiz.path} className="circle-typ-container">
                <div className="circle-typ">
                    <img src={quiz.image} alt={quiz.name} />
                </div>
                <p>Декомпозиция</p>
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

      const renderNavLink_translate = (quiz) => {
        if (availableQuizzes === 0) {
          return (
            <div className="circle-typ-container" >
            <div className="circle-typ">
              <img src={quiz.image} alt={quiz.name} />
              
            </div>
            <p>Перевод</p>
            </div>
          );
        } else {
          return (
            <NavLink to={quiz.path} className="circle-typ-container">
                <div className="circle-typ">
                    <img src={quiz.image} alt={quiz.name} />
                </div>
                <p>Перевод</p>
            </NavLink>
          );
        }
      }; 

      const renderNavLink_svoyak50 = (quiz) => {
        if (availableQuizzes === 0) {
          return (
            <div className="circle-typ-container" >
            <div className="circle-typ">
              <img src={quiz.image} alt={quiz.name} />
              
            </div>
            <p>Свояк за 50</p>
            </div>
          );
        } else {
          return (
            <NavLink to={quiz.path} className="circle-typ-container">
                <div className="circle-typ">
                    <img src={quiz.image} alt={quiz.name} />
                </div>
                <p>Свояк за 50</p>
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
        {renderNavLink(quizData[0])}
        </div>

        
        <div className="skill-row">
        {renderNavLink(quizData[1])}
        {renderNavLink(quizData[2])}
        </div>

        
        <div className="skill-row">
        {renderNavLink(quizData[3])}
        {renderNavLink(quizData[4])}
        </div>

        
        <div className="skill-row">
        {renderNavLink(quizData[5])}
        {renderNavLink(quizData[6])}
        </div>

        
        <div className="skill-row">
        {renderNavLink(quizData[7])}
        {renderNavLink(quizData[8])}
        </div>

        
        <div className="skill-row">
        {renderNavLink(quizData[9])}
        </div>
    </div>
    </ProtectedRoute>
    );
};
 
export default Type_and_Types;