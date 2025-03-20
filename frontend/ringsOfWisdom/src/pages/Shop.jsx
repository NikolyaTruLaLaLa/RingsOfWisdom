import './../assets/style/style_shop.css';
import React, { useState, useEffect } from 'react';
import coinImage from './../assets/images/monetka.png'; 

const API_BASE_URL = "https://localhost:5269/api"; 

const Shop = () => {
    const [balance, setBalance] = useState(0);
    const [availableQuizzes, setAvailableQuizzes] = useState(0);
    const [totalQuizzes, setTotalQuizzes] = useState(3);
    const quizPrice = 150;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/profile/info`);
                if (!response.ok) throw new Error("Ошибка загрузки данных");
                
                const data = await response.json();
                setBalance(data.balance);
                setAvailableQuizzes(data.quizLimit);
            } catch (error) {
                console.error("Ошибка получения данных пользователя:", error);
            }
        };

        fetchUserData();
    }, []);

    const handlePurchase = async () => {
        if (balance < quizPrice) {
            alert("Недостаточно монет!");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/buy-quiz-limit`, {
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
            setBalance(result.RemainingBalance);
            setAvailableQuizzes(result.NewQuizLimit);
            alert("Покупка успешна!");

        } catch (error) {
            console.error("Ошибка покупки:", error);
            alert("Не удалось совершить покупку");
        }
    };

    return (
        <div className="shop-container">
            <div className="header-info">
                <h1>ROW Store</h1>
                <div className="balance-info">
                    <img src={coinImage} alt="Coin" className="coin-icon" /> {/* Заменяем эмодзи на изображение */}
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
    );
}

export default Shop;