import './../assets/style/style_shop.css';

const Shop = () => {
    const balance = 0; 
    const availableQuizzes = 3; 
    const totalQuizzes = 3; 

    return (
        <div className="shop-container">
            <div className="header-info">
                <h1>ROW Store</h1>
                <div className="balance-info">
                    <span className="coin-icon">🪙</span>
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
                    <button className="purchase-button">200</button>
                </div>
            </div>
        </div>
    );
}

export default Shop;