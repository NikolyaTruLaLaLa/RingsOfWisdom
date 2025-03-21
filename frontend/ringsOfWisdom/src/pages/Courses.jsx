import React, { useState, useEffect } from 'react';
import "./../assets/style/style_courses.css";
const API_BASE_URL = "https://localhost:5269/api"; 

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
              const response = await fetch(`${API_BASE_URL}/Course/getCourses`, {
                method: "GET",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                credentials: "include",
              });
              const data = await response.json();
              setCourses(data)
            } catch (error) {
              console.error("Ошибка загрузки курсов:", error);
            }
          };

          fetchCourses();
    }, []);

    const handleCourseClick = (course) => {
        setSelectedCourse(course);
    };


    // Функция для форматирования текста
    const formatText = (text) => {
        // Разделяем текст по символу "/"
        const parts = text.split(/\/(.+)/).filter(Boolean);
    
        // Преобразуем в массив объектов
        return parts.map((part, index) => {
            if (index % 2 === 1) {
                // Нечетные элементы — это заголовки (после "/")
                return { type: "heading", content: part.trim() };
            } else {
                // Четные элементы — это обычный текст (до "/")
                return { type: "paragraph", content: part.trim() };
            }
        });
    };

    const closeModalpopupwindow = () => {
        const overlay = document.querySelector(".modal-overlay");
        overlay.classList.add("closing");
        setTimeout(() => {
            setSelectedCourse(null);
        }, 300); // Время анимации
    };

    return (
        <div className="courses-container">
            {courses.map((course, index) => (
                <div key={index} className="course-card" onClick={() => handleCourseClick(course)}>
                    <div className="course-name">{course.name}</div>
                </div>
            ))}
            {selectedCourse && (
                <div className="modal-overlay" onClick={closeModalpopupwindow}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2 className="curses-head">{selectedCourse.name}</h2>
                        <div className="curses-text">{formatText(selectedCourse.text).map((item, index) =>
                                item.type === "heading" ? (
                                    <h3 key={index} className="text-heading">{item.content}</h3>
                                ) : (
                                    <p key={index} className="text-paragraph">{item.content}</p>
                                )
                            )}</div>
                        <a href={selectedCourse.link} target="_blank" rel="noopener noreferrer">Источник</a>
                        <button onClick={closeModalpopupwindow}>Закрыть</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Courses;