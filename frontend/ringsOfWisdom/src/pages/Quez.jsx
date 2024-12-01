import './../assets/style/style_quez.css';
{/*import script_quez from './../scripts/script_quez'*/}

const Quez = () => {
    return ( 
        <div className="quiz-popup">
            <div className="quiz-header">
                <p id="question-number"></p>
            </div>
            <div className="quiz-body">
                <p className="quiz-question-text"> </p>
                <p className="quiz-question-form"></p>
                <input type="text" placeholder="Введите ваш ответ" className="answer-input"/>
                <button className="submit-button">Сдать бланк с ответом!</button>
            </div>
            <p id="feedback"></p>
            <div className="quiz-footer">
                <button onclick="document.location='/stngform'" className="back-to-menu">Вернуться на дерево</button>
            </div>
            
            {/*<script src={script_quez}></script>*/}
        </div> );
}
 
export default Quez;