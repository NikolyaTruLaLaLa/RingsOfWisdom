import './../assets/style/style_shop.css';

const Shop = () => {
    const balance = 0; 
    const availableQuizzes = 5; 
    const totalQuizzes = 10; 

    return (
        <div className="shop-container">
            <div className="header-info">
                <h1>ROW Store</h1>
                <div className="balance-info">
                    <span className="coin-icon">🪙</span>
                    <span>{balance}</span>
                    <span className="quiz-counter">{availableQuizzes}/{totalQuizzes} Осталось квизов</span>
                </div>
            </div>

            <div className="purchase-options">
                <div className="purchase-item">
                    <div className="icon-circle">
                        <span>📈</span> 
                    </div>
                    <p className="item-description">Увеличить дневной лимит квизов</p>
                    <button className="purchase-button">200</button>
                </div>
            </div>
        </div>
    );
}

export default Shop;