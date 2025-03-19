import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import useQuizzes from "./../hooks/UseQuizzes";
import dish from "./../assets/images/dish.png";
import icon_gendr_forms from "./../assets/images/icon_gendr_forms.png";
import many_faces from "./../assets/images/many_faces.png";
import reverse_x from "./../assets/images/reverse_x.png";
import "./../assets/style/style_skills_tree.css";

const quizData = [
  { name: "ГЕНдерные Формы", image: icon_gendr_forms, path: "/quiz/ГЕНдерные Формы" },
  { name: "Замена НЕизвестного", image: reverse_x, path: "/quiz/Замена НЕизвестного" },
  { name: "МногоЛикие", image: many_faces, path: "/quiz/МногоЛикие" },
  { name: "Первые и Вторые блюда", image: dish, path: "/quiz/Первые и Вторые блюда" }
];

const Strongformstree = () => {

  {/*
    const [availableQuizzes, setAvailableQuizzes] = useState(0);
    const [totalQuizzes, setTotalQuizzes] = useState(3);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/profile/info`); //переделать: нужен контроллер на бэке для получения данных о балансе и доступных квизах
                if (!response.ok) throw new Error("Ошибка загрузки данных");
                
                const data = await response.json();
                setAvailableQuizzes(data.quizLimit);
            } catch (error) {
                console.error("Ошибка получения данных пользователя:", error);
            }
        };

        fetchUserData();
    }, []); 
    */}
  const [isPopupVisible, setPopupVisible] = useState(true);

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div className="container_all">
  <div className="head">
    <p>Могучие Формы</p>
    {/*<span className="quiz-counter">{availableQuizzes}/{totalQuizzes} Осталось квизов</span>*/}
  </div>

  {/* Для больших экранов (>= 1025px) */}
  {window.innerWidth > 1025 && isPopupVisible && (
    <div className="popupwin">
      <div className="popupwin-content">
        <span className="close-btn" onClick={handleClosePopup}>
          &times;
        </span>
        <p>
          При переходе на квиз, считывается попытка квиза в день. Пройденным - квиз считается после взятия первых 2-ух вопросов.
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
          При переходе на квиз, считывается попытка квиза в день. Пройденным - квиз считается после взятия первых 2-ух вопросов.
        </p>
      </div>
    </div>
  )}
</div>
  );
};

export default Strongformstree;