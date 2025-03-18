import { useEffect, useState } from "react";
const API_BASE_URL = "https://localhost:5269/api/profile"; 

const useQuizzes = (skillName) => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/quizzes/${skillName}`);
        if (!response.ok) throw new Error("Ошибка загрузки квизов");
        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error("Ошибка загрузки квизов:", error);
      }
    };

    fetchQuizzes();
  }, [skillName]);

  return quizzes;
};

export default useQuizzes;
