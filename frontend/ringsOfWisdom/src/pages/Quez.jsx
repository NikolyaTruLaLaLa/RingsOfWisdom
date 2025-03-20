import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './../assets/style/style_quez.css';

const API_BASE_URL = "https://localhost:5269/api";

const Quez = () => {
  const { quizName } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const url = `${API_BASE_URL}/quizzes/${quizName}`;
        console.log("Request URL:", url);  // Логирование запроса
        const response = await fetch(url);
        if (!response.ok) {
            console.error("Ошибка ответа сервера:", response.status, response.statusText);
            throw new Error(`Квиз "${quizName}" не найден`);
        }
        const data = await response.json();
        setQuestions(data);
    } catch (error) {
        console.error("Ошибка загрузки квиза:", error);
      }
    };
    fetchQuestions();
  }, [quizName]);

  if (!questions.length) return <p>Загрузка вопросов или квиз не найден...</p>;

  const currentQuestion = questions[currentQuestionIndex];
  const normalizedAnswers = currentQuestion?.Answers.map(answer => answer.toLowerCase());
  const normalizedUserAnswer = userAnswer.trim().toLowerCase();

  const handleAnswerSubmit = () => {
    if (!normalizedUserAnswer) {
      setFeedback("Пожалуйста, введите ответ.");
      return;
    }

    if (normalizedAnswers.includes(normalizedUserAnswer)) {
      setFeedback(`Правильный ответ! ${currentQuestion.Explanation}`);
      setCorrectAnswersCount(prev => prev + 1);
    } else {
      if (attemptsLeft > 1) {
        setFeedback(`Неправильный ответ. Осталось попыток: ${attemptsLeft - 1}`);
        setAttemptsLeft(prev => prev - 1);
      } else {
        setFeedback("Попытки кончились. Верный ответ: " + currentQuestion.Answers[0]);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setUserAnswer("");
      setFeedback("");
      setAttemptsLeft(3);
    } else {
      fetch(`${API_BASE_URL}/quizzes/complete-quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizName, correctAnswersCount }),
      }).then(() => navigate("/stngform"));
    }
  };

  return (
    <div className="quiz-popup">
      <div className="quiz-header">
        <p>Вопрос {currentQuestionIndex + 1} из {questions.length}</p>
      </div>
      <div className="quiz-body">
        <div className='quiz-name'>{quizName}</div>
        <p className="quiz-question-text">{currentQuestion.Description}</p>
        <input
          type="text"
          className="answer-input"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Введите ваш ответ"
        />
        <button onClick={feedback.includes("Правильный") || attemptsLeft === 0 ? handleNextQuestion : handleAnswerSubmit}>
          {feedback.includes("Правильный") || attemptsLeft === 0 ? "Следующий вопрос" : "Сдать ответ"}
        </button>
        <p className="quiz-feedback">{feedback}</p>
      </div>
    </div>
  );
};

export default Quez;
