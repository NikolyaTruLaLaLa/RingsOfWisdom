const questions = [
    {
    question: "Какой ваш любимый цвет?",
    answers: ["Синий", "Красный", "Зелёный", "Жёлтый"],
    explanation: "Синий цвет является символом спокойствия и гармонии."
    },
    {
    question: "Какой ваш любимый фрукт?",
    answers: ["Яблоко", "Банан", "Груша", "Апельсин"],
    explanation: "Яблоки полезны для здоровья и содержат много витаминов."
    },
    {
    question: "Какое ваше любимое время года?",
    answers: ["Лето", "Осень", "Зима", "Весна"],
    explanation: "Лето — это время отпусков и тепла."
    }
    ];
    
    let currentQuestionIndex = 0;
    
    document.addEventListener("DOMContentLoaded", () => {
    loadQuestion();
    
    const submitButton = document.querySelector(".submit-button");
    submitButton.addEventListener("click", checkAnswer);
    });
    
    function loadQuestion() {
    const questionText = document.querySelector(".quiz-question-text");
    const questionNumber = document.getElementById("question-number");
    const feedback = document.getElementById("feedback");
    const answerInput = document.querySelector(".answer-input");
    
    feedback.innerText = '';
    
    const currentQuestion = questions[currentQuestionIndex];
    questionText.innerHTML = currentQuestion.question; 
    questionNumber.innerText = `Вопрос ${currentQuestionIndex+1} из ${questions.length}`;
    
    answerInput.value = "";
    document.querySelector(".submit-button").innerText = "Сдать бланк с ответом!";
    document.querySelector(".submit-button").onclick = checkAnswer;
    }
    
    function checkAnswer() {
    const answerInput = document.querySelector(".answer-input");
    const feedback = document.getElementById("feedback");
    const submitButton = document.querySelector(".submit-button");
    
    const userAnswer = answerInput.value.trim();
    const possibleAnswers = questions[currentQuestionIndex].answers;
    
    const normalizedAnswers = possibleAnswers.map(answer => answer.toLowerCase());
    
    if (userAnswer !== '') {
        if (normalizedAnswers.includes(userAnswer.toLowerCase())) {
            feedback.innerText = "Правильный ответ! " + questions[currentQuestionIndex].explanation;
            submitButton.innerText = "Следующий вопрос";
            submitButton.onclick = goToNextQuestion;
        } else {
            feedback.innerText = "Неправильный ответ. Попробуйте еще раз.";
        }
    } else {
        feedback.innerText = "Пожалуйста, введите ответ.";
    }
    }
    
    function goToNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
    } else {
    const feedback = document.getElementById("feedback");
    feedback.innerText = "Это был последний вопрос!";
    
        document.querySelector(".submit-button").disabled = true; 
    }
    }

/*function goBack() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}*/

