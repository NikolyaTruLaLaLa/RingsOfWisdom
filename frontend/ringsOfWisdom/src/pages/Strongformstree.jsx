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

const Strongformstree = () => {
  const skillName = "Могучие Формы";
  const quizzes = useQuizzesBySkill(skillName);
  const { availableQuizzes, totalQuizzes } = QuizDayStats();

  const [isPopupVisible, setPopupVisible] = useState(true);

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const renderNavLink = (quiz) => {
    const completedQuiz = quizzes.find((q) => q.name === quiz.name);

    if (!completedQuiz) {
      return (
        <div className="cir-cont loading">
          <div className="quiz-circle gray-circle">
            <img src={quiz.image} alt={quiz.name} />
          </div>
          <p>Загрузка...</p>
        </div>
      );
    }

    const circleClass = completedQuiz.isCompleted ? "green-circle" : "gray-circle";

    if (availableQuizzes === 0) {
      return (
        <div className="cir-cont disabled">
          <div className={`quiz-circle ${circleClass}`}>
            <img src={quiz.image} alt={quiz.name} />
          </div>
          <p>{quiz.name}</p>
        </div>
      );
    } else {
      return (
        <NavLink to={quiz.path} className="cir-cont">
          <div className={`quiz-circle ${circleClass}`}>
            <img src={quiz.image} alt={quiz.name} />
          </div>
          <p>{quiz.name}</p>
        </NavLink>
      );
    }
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
      </div>
    </ProtectedRoute>
  );
};

export default Strongformstree;
