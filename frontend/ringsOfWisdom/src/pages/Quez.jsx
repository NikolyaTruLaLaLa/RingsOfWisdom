import './../assets/style/style_quez.css';
{/*import script_quez from './../scripts/script_quez'*/}

import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';


const questions = [
    {
    question: "В сербском языке первую порцию ЕГО за день могут назвать «раздрему́ша». Назовите ЕГО несклоняемым словом.",
    answers: ["Кофе", "coffee", "кафе"],
    explanation: "Комментарий: Слово «раздремуша» родственно слову «дремать», а кофе как будто пробуждает человека.",
    },
    {
    question: "Герои романа То́ни Мо́ррисон, действие которого происходит в начале двадцатого века, едут на север, в Нью-Йорк. В описании поездки говорится, что после Де́лавэра в НЁМ убрали занавеску, которая разделяла ЕГО на две части. Назовите ЕГО, использовав дефис.",
    answers: ["Вагон-ресторан"],
    explanation: "Комментарий: Герои ехали на поезде, часть вагонов которого была для белых, а часть для афроамериканцев. Вагон-ресторан по требованиям сегрегации был разделён занавеской, которую убрали только после пересечения линии Мэ́йсона-Ди́ксона, разделяющей бывшие рабовладельческие штаты и свободные от рабства штаты севера США.",
    },
    {
    question: "При исследовании яиц вшей с древних мумий была получена неповрежденной уникальная информация о прошлом. Антропóлог сравнивает яйца вшей с НЕЙ. Назовите ЕЁ двумя словами.",
    answers: ["капсула времени", "капсула памяти", "письмо в будущее"],
    explanation: "Комментарий: Капсула времени – это послание, предназначенное для потомков. При исследовании яиц вшей на древних мумиях, археологи обнаружили, что скрепляющий их цемент сохраняет ДНК человека лучше, чем зубы или кости мумий. Само яйцо – это тоже своего рода капсула.",
    },
    ];
    
    const Quez = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [feedback, setFeedback] = useState("");
    
    const currentQuestion = questions[currentQuestionIndex];
    
    const handleAnswerSubmit = () => {
    const normalizedAnswers = currentQuestion.answers.map((answer) =>
    answer.toLowerCase()
    );
    const normalizedUserAnswer = userAnswer.trim().toLowerCase();
    
    if (normalizedUserAnswer === "") {
    setFeedback("Пожалуйста, введите ответ.");
    } else if (normalizedAnswers.includes(normalizedUserAnswer)) {
    setFeedback(`Правильный ответ! ${currentQuestion.explanation}`);
    } else {
    setFeedback("Неправильный ответ. Попробуйте еще раз.");
    }
    };
    
    const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setUserAnswer("");
    setFeedback("");
    } else {
    setFeedback("Это был последний вопрос!");
    }
    };
    
    return (
    <div className="quiz-popup">
    <div className="quiz-header">
    <p id="question-number">
    Вопрос {currentQuestionIndex + 1} из {questions.length}
    </p>
    </div>
    <div className="quiz-body">
    <div className="quiz-question">
    <p className="quiz-question-text">{currentQuestion.question}</p>
    </div>
    <div className="quiz-answer">
    <input
    type="text"
    className="answer-input"
    value={userAnswer}
    onChange={(e) => setUserAnswer(e.target.value)}
    placeholder="Введите ваш ответ"
    />
    </div>
    
    <button
    className="submit-button"
    onClick={
    feedback.includes("Правильный ответ!")
    ? handleNextQuestion
    : handleAnswerSubmit
    }
    >
    {feedback.includes("Правильный ответ!")
    ? "Следующий вопрос"
    : "Сдать бланк с ответом!"}
    </button>
    <div id="feedback" className="quiz-feedback">
    {feedback}
    </div>
    </div>
    <div className="quiz-footer">
                <NavLink to="/stngform" className="back-to-menu">
                    <button>Вернуться на дерево</button>
                </NavLink>
            </div>
    </div>
    );
    };
    
    export default Quez;