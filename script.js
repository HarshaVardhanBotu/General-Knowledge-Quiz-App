const quizData = [
    {
        question: "What is the capital of France?",
        a: "Berlin",
        b: "Madrid",
        c: "Paris",
        d: "Rome",
        correct: "c",
    },
    {
        question: "Who is the CEO of Tesla?",
        a: "Jeff Bezos",
        b: "Elon Musk",
        c: "Bill Gates",
        d: "Tony Stark",
        correct: "b",
    },
    {
        question: "What is the largest planet in our solar system?",
        a: "Earth",
        b: "Mars",
        c: "Jupiter",
        d: "Saturn",
        correct: "c",
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        a: "Oxygen",
        b: "Gold",
        c: "Osmium",
        d: "Oganesson",
        correct: "a",
    },
    {
        question: "Which country won the FIFA World Cup in 2018?",
        a: "Germany",
        b: "Brazil",
        c: "France",
        d: "Argentina",
        correct: "c",
    },
    {
        question: "In which year did the Titanic sink?",
        a: "1912",
        b: "1905",
        c: "1915",
        d: "1918",
        correct: "a",
    },
    {
        question: "What is the largest organ in the human body?",
        a: "Heart",
        b: "Skin",
        c: "Liver",
        d: "Lungs",
        correct: "b",
    },
    {
        question: "Which is the smallest prime number?",
        a: "0",
        b: "1",
        c: "2",
        d: "3",
        correct: "c",
    },
    {
        question: "Who painted the Mona Lisa?",
        a: "Vincent van Gogh",
        b: "Pablo Picasso",
        c: "Leonardo da Vinci",
        d: "Claude Monet",
        correct: "c",
    },
    {
        question: "What is the hardest natural substance on Earth?",
        a: "Gold",
        b: "Iron",
        c: "Diamond",
        d: "Platinum",
        correct: "c",
    }
];


const quiz = document.getElementById("quiz");
const startBtn = document.getElementById("start");
const nextBtn = document.getElementById("next");
const submitBtn = document.getElementById("submit");
const results = document.getElementById("results");
let currentQuiz = 0;
let score = 0;
let timer;
let outOfTime = false;

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
    startBtn.style.display = 'none';
    // quiz.style.display='block';  //until this the quiz Q&O are hidden
    // nextBtn.style.display='block';
    document.getElementById("quizPlayPortion").style.display = 'block';
    loadQuiz();
    startTimer();
}


let timeLeft = 100; // Set timer in seconds
const timerDisplay = document.getElementById("time");

// Function to start the timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;//update the displaying time
        if (timeLeft <= 0) {
            outOfTime = true;
            endQuiz(); // Call endQuiz function when time runs out
        }
    }, 1000);
}


function loadQuiz() {
    const currentQuizData = quizData[currentQuiz];
    quiz.innerHTML = `
        <div class="question">${currentQuizData.question}</div>
        <label>
            <input type="radio" name="answer" value="a">
            ${currentQuizData.a}
        </label>
        <label>
            <input type="radio" name="answer" value="b">
            ${currentQuizData.b}
        </label>
        <label>
            <input type="radio" name="answer" value="c">
            ${currentQuizData.c}
        </label>
        <label>
            <input type="radio" name="answer" value="d">
            ${currentQuizData.d}
        </label>
    `;
    // Check if we are on the last question
    if (currentQuiz === quizData.length - 1) {
        // Hide the "Next" button on the last question and show the "Submit" button
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        // Show the "Next" button for all other questions
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }

}

function getSelected() {
    const answers = document.querySelectorAll('input[name="answer"]');
    let selectedAnswer = null;
    answers.forEach(answer => {
        if (answer.checked) {
            selectedAnswer = answer.value;
        }
    });
    return selectedAnswer;
}


submitBtn.addEventListener("click", endQuiz);

nextBtn.addEventListener("click", () => {
    const answer = getSelected();
    if (answer === quizData[currentQuiz].correct) {
        score++;
    }
    currentQuiz++;
    if (currentQuiz < quizData.length) {
        loadQuiz();
    }
});

// Function to handle the end of the quiz
function endQuiz() {
    clearInterval(timer);
    if (outOfTime) {
        results.innerHTML = `Time's up! You scored ${score} out of ${quizData.length}`;
    } else {
        results.innerHTML = `You scored ${score} out of ${quizData.length}`;
    }
    submitBtn.style.display = 'none';//hide after submission
    quiz.innerHTML = ''; // Clear the quiz content
}



// Function to shuffle quiz questions
function shuffleQuestions(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleQuestions(quizData); // Shuffle questions before starting the quiz

// THE END
