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

    const closeModal = () => {
        setSelectedCourse(null);
    };

    return (
        <div className="courses-container">
            {courses.map((course, index) => (
                <div key={index} className="course-card" onClick={() => handleCourseClick(course)}>
                    <div className="course-name">{course.name}</div>
                </div>
            ))}
            {selectedCourse && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 className="curses-head">{selectedCourse.name}</h2>
                        <p className="curses-text">{selectedCourse.text}</p>
                        <a href={selectedCourse.link} target="_blank" rel="noopener noreferrer">Источник</a>
                        <button onClick={closeModal}>Закрыть</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Courses;