import React, { useState, useEffect } from 'react';
import "./../assets/style/style_courses.css";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        fetch('https://your-backend-api.com/courses')
            .then(response => response.json())
            .then(data => setCourses(data))
            .catch(error => console.error('Error fetching courses:', error));
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
                        <h2>{selectedCourse.name}</h2>
                        <p>{selectedCourse.description}</p>
                        <a href={selectedCourse.source} target="_blank" rel="noopener noreferrer">Источник</a>
                        <button onClick={closeModal}>Закрыть</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Courses;