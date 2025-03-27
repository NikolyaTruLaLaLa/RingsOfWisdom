import './../assets/style/style_shop.css';
import React, { useState, useEffect } from 'react';
import QuizDayStats from "./../hooks/QuizDayStats";
import coinImage from './../assets/images/monetka.png'; 
import ProtectedRoute from "../hooks/ProtectedRoute";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Shop = () => {
    const [balance, setBalance] = useState(0);
    const {availableQuizzes, totalQuizzes, refreshStats} = QuizDayStats();
    const quizPrice = 150;


    const fetchUserBalance = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/profile/balance`, {
            method: "GET",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            credentials: "include",
          });
          const data = await response.json();
          setBalance(data.balance);
        } catch (error) {
          console.error("Ошибка загрузки Баланса:", error);
        }
      };

    useEffect(() => {
        fetchUserBalance();
    }, []);

    const handlePurchase = async () => {
        if (balance < quizPrice) {
            alert("Недостаточно монет!");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/shop/buy-quiz-limit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ price: quizPrice }),
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.message || "Ошибка при покупке");
                return;
            }

            const result = await response.json();

            await fetchUserBalance();
            await refreshStats();
            
            alert("Покупка успешна!");

        } catch (error) {
            console.error("Ошибка покупки:", error);
            alert("Не удалось совершить покупку");
        }
    };

    return (
        <ProtectedRoute>
            <div className="shop-container">
                <div className="header-info">
                    <h1>ROW Store</h1>
                    <div className="balance-info">
                        <img src={coinImage} alt="Coin" className="coin-icon" />
                        <span>{balance}</span>
                        <span className="quiz-counter">{availableQuizzes}/{totalQuizzes} Количество квизов в день</span>
                    </div>
                </div>

                <div className="purchase-options">
                    <div className="purchase-item">
                        <div className="icon-circle">
                            <span>📈</span> 
                        </div>
                        <p className="item-description">Увеличить дневной лимит квизов</p>
                        <button className="purchase-button" onClick={handlePurchase}>{quizPrice}</button>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}

export default Shop;