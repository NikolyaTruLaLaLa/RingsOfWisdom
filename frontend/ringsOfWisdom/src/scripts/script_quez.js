
    const questions = [
    {
    question: "В сербском языке первую порцию ЕГО за день могут назвать «раздрему́ша». Назовите ЕГО несклоняемым словом.",
    answers: ["Кофе","coffee", "кафе"],
    explanation: "Комментарий: Слово «раздремуша» родственно слову «дремать», а кофе как будто пробуждает человека."
    },
    {
    question: "Герои романа То́ни Мо́ррисон, действие которого происходит в начале двадцатого века, едут на север, в Нью-Йорк. В описании поездки говорится, что после Де́лавэра в НЁМ убрали занавеску, которая разделяла ЕГО на две части. Назовите ЕГО, использовав дефис.",
    answers: ["Вагон-ресторан"],
    explanation: "Комментарий:  Герои ехали на поезде, часть вагонов которого была для белых, а часть для афроамериканцев. Вагон-ресторан по требованиям сегрегации был разделён занавеской, которую убрали только после пересечения линии Мэ́йсона-Ди́ксона, разделяющей бывшие рабовладельческие штаты и свободные от рабства штаты севера США."
    },
    {
    question: "При исследовании яиц вшей с древних мумий была получена неповрежденной уникальная информация о прошлом. Антропóлог сравнивает яйца вшей с НЕЙ. Назовите ЕЁ двумя словами.",
    answers: ["капсула времени", "капсула памяти", "письмо в будущее",],
    explanation: "Комментарий: Капсула времени – это послание, предназначенное для потомков. При исследовании яиц вшей на древних мумиях, археологи обнаружили, что скрепляющий их цемент сохраняет ДНК человека лучше, чем зубы или кости мумий. Само яйцо – это тоже своего рода капсула."
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

