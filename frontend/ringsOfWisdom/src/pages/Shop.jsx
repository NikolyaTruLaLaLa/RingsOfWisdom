import './../assets/style/style_shop.css';

const Shop = () => {
    const balance = 0; 
    const totalQuizzes = 100;
    const remainingQuizzes = 75; 

    return (
        <div className="shop-container">
            <div className="header-info">
                <h1>ROW Store</h1>
                <div className="balance-info">
                    <span className="coin-icon">🪙</span>
                    <span>{balance}</span>
                </div>
            </div>

            <div className="purchase-options">
                <div className="purchase-item">
                    <div className="icon-circle">
                        <span>🚫</span> 
                    </div>
                    <p className="item-description">Disable Ads for 30 Days</p>
                    <button className="purchase-button">150</button>
                </div>

                <div className="purchase-item">
                    <div className="icon-circle">
                        <span>🌟</span> 
                    </div>
                    <p className="item-description">No Ads Ever Again</p>
                    <button className="purchase-button">1500</button>
                </div>

                <div className="purchase-item">
                    <div className="icon-circle">
                        <span>🎓</span> 
                    </div>
                    <p className="item-description">Discount on a Membership</p>
                    <button className="purchase-button">150</button>
                </div>

                <div className="purchase-item">
                    <div className="icon-circle">
                        <span>📚</span> 
                    </div>
                    <p className="item-description">Discount on a Course</p>
                    <button className="purchase-button">100</button>
                </div>
            </div>
        </div>
    );
}

export default Shop;