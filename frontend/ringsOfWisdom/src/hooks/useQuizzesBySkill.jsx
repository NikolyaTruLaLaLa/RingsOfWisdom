import { useEffect, useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useQuizzesBySkill = (skillName) => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (!skillName) return;

      try {
        const response = await fetch(`${API_BASE_URL}/quizzes/skill/${encodeURIComponent(skillName)}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          credentials: "include",
      });
        if (!response.ok) throw new Error("Ошибка загрузки списка квизов");
        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error("Ошибка загрузки списка квизов:", error);
      }
    };

    fetchQuizzes();
  }, [skillName]);

  return quizzes;
};

export default useQuizzesBySkill;
