import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProtectedRoute from "../hooks/ProtectedRoute";
import { useAuth } from "../hooks/AuthContext";
import { NavLink } from "react-router-dom";
import "./../assets/style/style_quez.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Quez = () => {
  const { quizName } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [canStartQuiz, setCanStartQuiz] = useState(null);
  const isFetched = useRef(false);
  const isComplited = useRef(false);
  const isChecked = useRef(false);
  const { isAuthenticated } = useAuth();
  const [quizResult, setQuizResult] = useState(null);


  const checkCanStartQuiz = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/quizzes/can-start`, {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        credentials: "include",
      });
      const data = await response.json();
      if (data.canStart) {
        setCanStartQuiz(true);
      } else {
        alert(data.message);
        navigate("/skills");
      }
    } catch (error) {
      console.error("Ошибка при проверке возможности начала квиза:", error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/quizzes/${quizName}`, {
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
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "Вы уверены? Прогресс будет потерян!";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/auth");
      return;
    }
    if (!quizName) {
      navigate("/skills");
      return;
    }
    if (!isChecked.current) {
      checkCanStartQuiz();
      isChecked.current = true;
    }
  }, [quizName, navigate, isAuthenticated]);

  useEffect(() => {
    if (canStartQuiz && !isFetched.current) {
      fetchQuestions();
      isFetched.current = true;
    }
  }, [canStartQuiz]);

  if (canStartQuiz === null) return <p>Проверка возможности начала квиза...</p>;

  if (!questions.length) return <p>Загрузка вопросов или квиз не найден...</p>;

  const normalizeString = (str) => {
    if (!str || typeof str !== "string") {
      return "";
    }

    const normalized = str
      .toLowerCase()
      .replace(/[^a-zа-яё\s-]/gi, "")
      .replace(/\s+/g, " ")
      .trim();

    return normalized;
  };

  const checkUserAnswer = (userAnswer, correctAnswers) => {
    const normalizeString = (str) => {
      return str
        .toLowerCase()
        .replace(/[^a-zа-яё\s-]/gi, "")
        .trim();
    };

    const removeWordEnding = (word) => {
      if (/[а-яё]/i.test(word)) {
        return word.replace(/(а|я|ы|и|о|е|ё|у|ю|й|ь|ъ)$/, "");
      }
      return word.replace(/(ing|ed|s|es|er|ly|ion|ment)$/, "");
    };

    const normalizeAndStem = (str) => {
      return normalizeString(str)
        .split(/\s+/)
        .map(removeWordEnding);
    };

    const userWords = normalizeAndStem(userAnswer);

    for (let correctAnswer of correctAnswers) {
      const correctWords = normalizeAndStem(correctAnswer);

      if (
        userWords.length === correctWords.length &&
        userWords.every((word, index) => word === correctWords[index])
      ) {
        return true;
      }
    }

    return false;
  };

  const handleAnswerSubmit = () => {
    if (attemptsLeft === 0) return;
    if (!userAnswer.trim()) {
      setFeedback("Пожалуйста, введите ответ.");
      return;
    }

    if (!currentQuestion.answers || !Array.isArray(currentQuestion.answers)) {
      console.error("Ответы из базы данных отсутствуют или имеют неверный формат.");
      setFeedback("Ошибка: ответы из базы данных отсутствуют.");
      return;
    }

    const isCorrect = checkUserAnswer(userAnswer, currentQuestion.answers);
    if (isCorrect) {
      setFeedback(`Правильный ответ! ${currentQuestion.explanation}`);
      setCorrectAnswersCount((prev) => prev + 1);
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
      setCurrentQuestionIndex((prev) => prev + 1);
      setUserAnswer("");
      setFeedback("");
      setAttemptsLeft(3);
    } else {
      setCorrectAnswersCount((prevCorrectAnswers) => {
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
    window.removeEventListener("beforeunload", () => {});
  
    try {
      const response = await fetch(`${API_BASE_URL}/quizzes/complete-quiz`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
        body: JSON.stringify({ quizName, correctAnswersCount: finalCorrectAnswersCount }),
      });
  
      if (!response.ok) throw new Error("Ошибка завершения квиза");
  
      const result = await response.json();
      setQuizResult(result);
    } catch (error) {
      console.error("Ошибка при завершении квиза:", error);
      setFeedback("Ошибка при завершении квиза.");
    }
  };
  

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <ProtectedRoute>
      <div className="quiz-popup">
        {!quizResult ? (
          <>
            <div className="quiz-header">
              <p>Вопрос {currentQuestionIndex + 1} из {questions.length}</p>
            </div>
            <div className="quiz-body">
              <div className="quiz-name">{quizName}</div>
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
                onClick={
                  feedback.includes("Правильный") || attemptsLeft === 0
                    ? handleNextQuestion
                    : handleAnswerSubmit
                }
              >
                {feedback.includes("Правильный") || attemptsLeft === 0
                  ? currentQuestionIndex < questions.length - 1
                    ? "Следующий вопрос"
                    : "Завершить квиз"
                  : "Сдать ответ"}
              </button>
              <p className="quiz-feedback">{feedback}</p>
            </div>
            <div className="quiz-footer">
              <NavLink to="/skills" className="back-to-menu">
                <button>
                  Вернуться на дерево
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z"
                      fill="white" />
                  </svg>
                </button>
              </NavLink>
            </div>
          </>
        ) : (
          <>
            <div className="quiz-header">
              <h1>{quizResult.name}</h1>
            </div>
            <div className="quiz-body">
              <h2 className={quizResult.isPassed ? "result-success" : "result-fail"}>
                {quizResult.isPassed ? "🎉 Квиз пройден!" : "❌ Квиз не пройден"}
              </h2>
              {quizResult.isFstTime && (
                <div className="first-time-bonus">
                  🔥 Это ваш первый проход — награда увеличена в <strong>x1.5</strong>!
                </div>
              )}
              <p>🌟 Получено опыта: <strong>{quizResult.totalXP}</strong></p>
              <p>💰 Получено монеток: <strong>{quizResult.totalRings}</strong></p>
            </div>
            <div className="quiz-footer">
              <NavLink to="/skills" className="back-to-menu">
                <button>
                  Вернуться на дерево
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z"
                      fill="white" />
                  </svg>
                </button>
              </NavLink>
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
  
};

export default Quez;