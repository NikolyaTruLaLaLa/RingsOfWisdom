import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProtectedRoute from "../hooks/ProtectedRoute";
import { useAuth } from "../hooks/AuthContext";
import { NavLink } from "react-router-dom";
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
  const isFetched = useRef(false);
  const isComplited = useRef(false);
  const { isAuthenticated } = useAuth();




  const fetchQuestions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/quizzes/${quizName}`,{
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        credentials: "include",
      });
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

  useEffect(() => {
    if (isAuthenticated === false) {
        navigate("/auth");
    }
    else if (!quizName)
    {
        navigate("/skills");
    }
    else{
        if (!isFetched.current) {
            fetchQuestions();
            isFetched.current = true;
    }}
  }, [quizName, navigate, isAuthenticated]);

  if (!questions.length) return <p>Загрузка вопросов или квиз не найден...</p>;

  const currentQuestion = questions[currentQuestionIndex];
  const normalizedAnswers = currentQuestion?.answers?.map(answer => answer.toLowerCase()) || [];
  const normalizedUserAnswer = userAnswer.trim().toLowerCase();

  const handleAnswerSubmit = () => {
    if (attemptsLeft === 0) return;
    if (!normalizedUserAnswer) {
      setFeedback("Пожалуйста, введите ответ.");
      return;
    }

    if (normalizedAnswers.includes(normalizedUserAnswer)) {
      setFeedback(`Правильный ответ! ${currentQuestion.explanation}`);
      setCorrectAnswersCount(prev => prev + 1);
      setAttemptsLeft(0);
    } else {
      setAttemptsLeft((prevAttempts) => {
        const newAttempts = prevAttempts - 1;
        return newAttempts;
      });
      if (attemptsLeft === 1) {
        setFeedback("Попытки кончились.");
        
      } else {
        setFeedback(`Неправильный ответ. Осталось попыток: ${attemptsLeft - 1}`);
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
      setCorrectAnswersCount(prevCorrectAnswers => {
        const newCount = prevCorrectAnswers; 
        if (!isComplited.current) {
          completeQuiz(newCount);
          isComplited.current = true;
        }
        return newCount;
      });
    }
  };
  const completeQuiz = async (finalCorrectAnswersCount) => {
    try {
      const response = await fetch(`${API_BASE_URL}/quizzes/complete-quiz`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${localStorage.getItem("token")}` 
        },
        credentials: "include",
        body: JSON.stringify({ quizName, correctAnswersCount: finalCorrectAnswersCount }),
      });
  
      if (!response.ok) throw new Error("Ошибка завершения квиза");
  
      navigate("/skills");
    } catch (error) {
      console.error("Ошибка при завершении квиза:", error);
      setFeedback("Ошибка при завершении квиза.");
    }
  };
  
  
  

  return (
    <ProtectedRoute>
      <div className="quiz-popup">
        <div className="quiz-header">
          <p>Вопрос {currentQuestionIndex + 1} из {questions.length}</p>
        </div>
        <div className="quiz-body">
          <div className='quiz-name'>{quizName}</div>
          <p className="quiz-question-text">{currentQuestion.description}</p>
          <input
            type="text"
            className="answer-input"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Введите ваш ответ"
            disabled={attemptsLeft === 0} 
          />
          <button 
            onClick={feedback.includes("Правильный") || attemptsLeft === 0 ? handleNextQuestion : handleAnswerSubmit}
          >
            {feedback.includes("Правильный") || attemptsLeft === 0
              ? (currentQuestionIndex < questions.length - 1 ? "Следующий вопрос" : "Завершить квиз")
                : "Сдать ответ"
            }
          </button>


          <p className="quiz-feedback">{feedback}</p>
        </div>
        <div className="quiz-footer">
                <NavLink to="/skills" className="back-to-menu">
                    <button>Вернуться на дерево</button>
                </NavLink>
          </div>
      </div>
    </ProtectedRoute>
  );
};

export default Quez;
