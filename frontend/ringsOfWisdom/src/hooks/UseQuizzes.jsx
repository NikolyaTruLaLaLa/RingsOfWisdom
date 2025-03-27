import { useEffect, useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useQuizzes = (quizName) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/quizzes/${encodeURIComponent(quizName)}`);
        if (!response.ok) throw new Error("Ошибка загрузки вопросов");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Ошибка загрузки вопросов:", error);
      }
    };

    fetchQuestions();
  }, [quizName]);

  return questions;
};

export default useQuizzes;
