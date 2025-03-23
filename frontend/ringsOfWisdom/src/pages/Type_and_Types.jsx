import React, { useState, useEffect } from "react"
import { NavLink } from 'react-router-dom';
import QuizDayStats from "./../hooks/QuizDayStats";
import ProtectedRoute from "../hooks/ProtectedRoute";

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


const quizData = [
  { name: "БАЗА", image: baza, path: "/quiz/БАЗА" },
  { name: "Раздатка", image: razdatka, path: "/quiz/Раздатка" },
  { name: "Замена", image: zamena, path: "/quiz/Замена" },
  { name: "Блатные номера", image: blatie_nomera, path: "/quiz/Блатные номера" },
  { name: "РаздатоЧКА", image: razdatOCHKA, path: "/quiz/РаздатоЧКА" },
  { name: "Замена замен замены замен", image: zamena_zamen, path: "/quiz/Замена замен замены замен" },
  { name: "Связанные одной цепью", image: svyazannye, path: "/quiz/Связанные одной цепью" },
  { name: "Кот в Чёрном Ящике", image: kot, path: "/quiz/Кот в Чёрном Ящике" },
  { name: "Странные фразочки", image: frazochki, path: "/quiz/Странные фразочки" },
  { name: "БЛИЦ БЛИЦ БЛИЦ", image: blitz, path: "/quiz/БЛИЦ БЛИЦ БЛИЦ" }
];


const Type_and_Types = () => {
    
    const {availableQuizzes, totalQuizzes} = QuizDayStats();
        useEffect(() => {
        }, []);
        
      const handleClosePopup = () => {
        setPopupVisible(false);
    
      };


      const renderNavLink_kot = (quiz) => {
        if (availableQuizzes === 0) {
          return (
            <div className="circle-typ-container" >
            <div className="circle-typ">
              <img src={quiz.image} alt={quiz.name} />
              
            </div>
            <p>Кот в Чёрном<br/>Ящике</p>
            </div>
          );
        } else {
          return (
            <NavLink to={quiz.path} className="circle-typ-container" >
                <div className="circle-typ">
                    <img src={quiz.image} alt={quiz.name} />
                </div>
                <p>Кот в Чёрном<br/>Ящике</p>
            </NavLink>
          );
        }
      };

      const renderNavLink_frazochki = (quiz) => {
        if (availableQuizzes === 0) {
          return (
            <div className="circle-typ-container" >
            <div className="circle-typ">
              <img src={quiz.image} alt={quiz.name} />
              
            </div>
            <p>Странные<br/>фразочки</p>
            </div>
          );
        } else {
          return (
            <NavLink to={quiz.path} className="circle-typ-container">
                <div className="circle-typ">
                    <img src={quiz.image} alt={quiz.name} />
                </div>
                <p>Странные<br/>фразочки</p>
            </NavLink>
          );
        }
      };


      const renderNavLink_zamena_zamen = (quiz) => {
        if (availableQuizzes === 0) {
          return (
            <div className="circle-typ-container" >
                <div className="circle-typ" >
                  <img src={quiz.image} alt={quiz.name} />
                 
                </div>
                <p>Замена замен<br/>замены замен</p>
            </div>
          );
        } else {
          return (
            <NavLink to={quiz.path} className="circle-typ-container">
                <div className="circle-typ">
                    <img src={quiz.image} alt={quiz.name} />
                </div>
                <p>Замена замен<br/>замены замен</p>
            </NavLink>
          );
        }
      }; 

      const renderNavLink_svyazannye = (quiz) => {
        if (availableQuizzes === 0) {
          return (
            <div className="circle-typ-container" >
            <div className="circle-typ">
              <img src={quiz.image} alt={quiz.name} />
              
            </div>
            <p>Замена замен<br/>замены замен</p>
            </div>
          );
        } else {
          return (
            <NavLink to={quiz.path} className="circle-typ-container">
                <div className="circle-typ">
                    <img src={quiz.image} alt={quiz.name} />
                </div>
                <p>Связанные<br/>одной цепью</p>
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
        <p>Типы типочки
            <br/>
        <span className="quiz-counter">
        {availableQuizzes <= 0 
        ? "Ваш лимит квизов в день закончился :( Они обновляются в 00:00 по Мск, либо можете купить попытки в нашем магазине!" 
        : `Осталось квизов: ${availableQuizzes}/${totalQuizzes}`}</span>
        </p>
    </div>
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

        {/* Первый ряд (1 кружок) */}
        <div className="skill-row">
        {renderNavLink(quizData[0])}
        </div>

        {/* Второй ряд (2 кружка) */}
        <div className="skill-row">
        {renderNavLink(quizData[1])}
        {renderNavLink(quizData[2])}
        </div>

        {/* Третий ряд (2 кружка) */}
        <div className="skill-row">
        {renderNavLink(quizData[3])}
        {renderNavLink(quizData[4])}
        </div>

        {/* Четвертый ряд (2 кружка) */}
        <div className="skill-row">
        {renderNavLink_zamena_zamen(quizData[5])}
        {renderNavLink_svyazannye(quizData[6])}
        </div>

        {/* Пятый ряд (2 кружка) */}
        <div className="skill-row">
        {renderNavLink_kot(quizData[7])}
        {renderNavLink_frazochki(quizData[8])}
        </div>

        {/* Шестой ряд (1 кружок) */}
        <div className="skill-row">
        {renderNavLink(quizData[9])}
        </div>
    </div>
    </ProtectedRoute>
    );
};
 
export default Type_and_Types;