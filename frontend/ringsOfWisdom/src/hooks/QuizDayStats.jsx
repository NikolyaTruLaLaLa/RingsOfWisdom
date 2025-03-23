import { useState, useEffect, useCallback } from "react";

const API_BASE_URL = "https://localhost:5269/api";

export const QuizDayStats = () => {
    const [availableQuizzes, setAvailableQuizzes] = useState(0);
    const [totalQuizzes, setTotalQuizzes] = useState(3);

    const fetchUserData = useCallback(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/profile/quiz-stats`, {
                method: "GET",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                credentials: "include",
            });

            if (!response.ok) throw new Error("Ошибка загрузки данных");

            const data = await response.json();
            setTotalQuizzes(data.quizLimit);
            setAvailableQuizzes(data.quizPassed);
        } catch (error) {
            console.error("Ошибка получения данных пользователя:", error);
        }
    }, []);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    return { availableQuizzes, totalQuizzes, refreshStats: fetchUserData };
};

export default QuizDayStats;
