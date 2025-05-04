import React, { useState, useEffect } from "react"
import { NavLink } from 'react-router-dom';
import QuizDayStats from "./../hooks/QuizDayStats";
import ProtectedRoute from "../hooks/ProtectedRoute";

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


const quizData = [
  { name: "Пушкин", image: pushkin, path: "/quiz/Пушкин" },
  { name: "Гарри", image: gari, path: "/quiz/Гарри" },
  { name: "Греция", image: Greece, path: "/quiz/Греция" },
  { name: "Картинки", image: imageForBingo, path: "/quiz/Картинки" },
  { name: "Библия", image: biblia, path: "/quiz/Библия" },
  { name: "Литература", image: literature, path: "/quiz/Литература" },
  { name: "Городки", image: town, path: "/quiz/Городки" },
  { name: "Навуки", image: science, path: "/quiz/Навуки" },
  { name: "Про Русов", image: rus, path: "/quiz/Про Русов" },
  { name: "Factы", image: Factы, path: "/quiz/Factы" }
];


const Pages_Bingo = () => {
    
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
 
export default Pages_Bingo;