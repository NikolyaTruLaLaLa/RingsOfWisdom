import './../assets/style/style_shop.css';
import React, { useState, useEffect } from 'react';
import QuizDayStats from "./../hooks/QuizDayStats";
import coinImage from './../assets/images/monetka.png'; 
import ProtectedRoute from "../hooks/ProtectedRoute";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Shop = () => {
    const [balance, setBalance] = useState(0);
    const [prices, setPrices] = useState({ One: 0, Five: 0, Ten: 0 });
    const [message, setMessage] = useState({ type: '', text: '' });
    const { availableQuizzes, totalQuizzes, refreshStats } = QuizDayStats();

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

    const fetchPrices = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/shop/prices`, {
                method: "GET",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                credentials: "include",
            });
            const data = await response.json();
            setPrices(data);
        } catch (error) {
            console.error("Ошибка получения цен:", error);
        }
    };

    useEffect(() => {
        fetchUserBalance();
        fetchPrices();
    }, []);

    useEffect(() => {
    if (message.text) {
        const timeout = setTimeout(() => {
            setMessage({ type: '', text: '' });
        }, 5000);
        return () => clearTimeout(timeout);
    }
    }, [message]);
    const closeMessage = () => {
    setMessage({ type: '', text: '' });
    };

    const handlePurchase = async (quantity) => {
        try {
            const response = await fetch(`${API_BASE_URL}/shop/buy-quiz-limit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                credentials: "include",
                body: JSON.stringify({ quantity }),
            });

            const result = await response.json();

            if (!response.ok) {
                setMessage({ type: 'error', text: result.message || "Ошибка при покупке" });
                return;
            }

            await fetchUserBalance();
            await refreshStats();

            setMessage({ type: 'success', text: result.message || "Покупка успешна!" });
        } catch (error) {
            console.error("Ошибка покупки:", error);
            setMessage({ type: 'error', text: "Не удалось совершить покупку" });
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
                        <div className="icon-circle">📈</div>
                        <p className="item-description">1 дополнительный квиз</p>
                        <button className="purchase-button" onClick={() => handlePurchase(1)}>{prices.One} 🪙</button>
                    </div>


                    <div className="purchase-item">
                        <div className="icon-circle">🔥</div>
                        <p className="item-description">Пакет из 5 квизов (-10%)</p>
                        <button className="purchase-button" onClick={() => handlePurchase(5)}>{prices.Five} 🪙</button>
                    </div>

                    <div className="purchase-item">
                        <div className="icon-circle">💎</div>
                        <p className="item-description">Пакет из 10 квизов (ещё выгоднее)</p>
                        <button className="purchase-button" onClick={() => handlePurchase(10)}>{prices.Ten} 🪙</button>
                    </div>
                </div>

                {message.text && (
                <div className={`message-box ${message.type}`}>
                    <span className="close-btn" onClick={closeMessage}>×</span>
                    {message.text}
                </div>
)}
            </div>
        </ProtectedRoute>
    );
};

export default Shop;
