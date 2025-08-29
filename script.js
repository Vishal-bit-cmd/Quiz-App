let selectedMode = null;
let quizData = [];  

function setMode(mode) {
    selectedMode = mode;
    const btn = document.getElementById("modeButton");
    btn.innerText = "Mode: " + mode.charAt(0).toUpperCase() + mode.slice(1);
}

function startGame() {
    if (!selectedMode) {
        selectedMode = "easy";
    }

    if (selectedMode === "easy") {
        quizData = easyQuestions;
    } else if (selectedMode === "medium") {
        quizData = mediumQuestions;
    } else if (selectedMode === "hard") {
        quizData = hardQuestions;
    }

    window.location.href = "game.html?mode=" + selectedMode;
}

const easyQuestions = [
    {
     question: "What is the capital of India?",
     options: ["Chennai", "Kolkata", "New Delhi", "Mumbai"],
    answer: "New Delhi"
    },
    {
     question: "Who is the king of the jungle?",
     options: ["Tiger", "Cheetah", "Panther", "Lion"],
    answer: "Lion"
    },
    {
    question: "How many days are there in a week?",
    options: ["5", "6", "7", "8"],
    answer: "7"
    },
    {
    question: "Who is the father of the nation?",
    options: ["Mahatma Gandhi", "Jawarhalal Nehru", "Ambedkar", "Subash Chandra Bose"],
    answer: "Mahatma Gandhi"
    },
    {
    question: "Eskimos live in?",
    options: ["House", "Apartment", "Igloo", "Tent"],
    answer: "Igloo"
    }
];

const mediumQuestions = [
    {
        question:"Which planet has 63 moons?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        answer: "Jupiter"
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["Shakespeare", "Tolstoy", "Dickens", "Homer"],
        answer: "Shakespeare"
    },
    {
    question: "Which gas do humans need to breathe?",
    options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
    answer: "Oxygen"
    },
    {
    question: "Which is the largest continent on Earth?",
    options: ["Asia", "Africa", "North America", "Europe"],
    answer: "Asia"
   },
   {
    question: "What is the square root of 64?",
    options: ["6", "7", "8", "9"],
    answer: "8"
   } 
];

const hardQuestions =[
    {
    question: "Which festival is known as the Festival of Lights in India?",
    options: ["Holi", "Diwali", "Eid", "Christmas"],
    answer: "Diwali"
  },
  {
    question: "What is the freezing point of water?",
    options: ["0°C", "100°C", "50°C", "10°C"],
    answer: "0°C"
  },
   {
    question: "Which is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    answer: "2"
  },
  {
    question: "What is the chemical symbol for Gold?",
    options: ["Ag", "Au", "Gd", "Go"],
    answer: "Au"
  },
  {
    question: "Which organ in the human body purifies blood?",
    options: ["Heart", "Lungs", "Liver", "Kidney"],
    answer: "Kidney"
  }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;
const timerBox = document.querySelector('.timer');
const timerElement = document.getElementById('time');
const questionElement = document.querySelector('.question');
const optionsElement = document.querySelector('.options');
const nextBtn = document.getElementById('next-btn');
const resultElement = document.querySelector('.result');
const scoreElement = document.getElementById('score');
const restartBtn = document.querySelector('.restart-btn');

function loadQuestionsByMode() {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode") || "easy";

    if (mode === "easy") quizData = easyQuestions;
    else if (mode === "medium") quizData = mediumQuestions;
    else quizData = hardQuestions;

    const modeDisplay = document.getElementById("modeDisplay");
    modeDisplay.textContent = "Mode: " + mode.charAt(0).toUpperCase() + mode.slice(1);

    loadQuestion();
}

function loadQuestion() {
            if (currentQuestion >= quizData.length) {
                endQuiz();
                return;
            }

            clearInterval(timerInterval);
            timeLeft = 15;
            timerElement.textContent = timeLeft;
            startTimer();

            const currentQuiz = quizData[currentQuestion];
            questionElement.textContent = currentQuiz.question;
            optionsElement.innerHTML = '';
            nextBtn.style.display="none";
            
            currentQuiz.options.forEach(option => {
                const button = document.createElement('button');
                button.classList.add('option');
                button.textContent = option;
                button.onclick = () => checkAnswer(option);

                optionsElement.appendChild(button);
            });
        }

function checkAnswer(selectedOption) {
        clearInterval(timerInterval)
        const correctAnswer=quizData[currentQuestion].answer;
        const optionButtons=document.querySelectorAll('.option');
            
        optionButtons.forEach(btn => {
        btn.disabled = true; 
        if (btn.textContent === correctAnswer) {
            btn.classList.add("correct");
        }
        if (btn.textContent === selectedOption && selectedOption !== correctAnswer) {
            btn.classList.add("wrong");
        }
    });

    if (selectedOption === correctAnswer) {
        score++;
    }
    document.getElementById("next-btn").style.display = "block";
   }
   
function nextQuestion() {
    currentQuestion++;
    document.getElementById("next-btn").style.display = "none";
    loadQuestion();
}

function startTimer() {
            timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;

            if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeout();
            }
    }, 1000);
}

function handleTimeout() {
  const correctAnswer = quizData[currentQuestion].answer;
  const optionButtons = document.querySelectorAll('.option');

  optionButtons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) btn.classList.add("correct");
  });

  nextBtn.style.display = "block";

  setTimeout(() => {
    nextQuestion();
  }, 2000);
}

function endQuiz() {
            clearInterval(timerInterval);
            questionElement.style.display = 'none';
            optionsElement.style.display = 'none';
            resultElement.style.display = 'block';
            timerBox.style.display = 'none';

            let highScore = localStorage.getItem("highScore") || 0;
            if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
            }
            scoreElement.textContent = score;

            let highScoreElement = document.getElementById("highScore");
            if (!highScoreElement) {
            highScoreElement = document.createElement("p");
            highScoreElement.id = "highScore";
            resultElement.appendChild(highScoreElement);
            }
            highScoreElement.textContent = "Best: " + highScore;

            let homeBtn = document.getElementById("homeBtn");
    
            if (!homeBtn) {
            homeBtn = document.createElement("button");
            homeBtn.id = "homeBtn";
            homeBtn.textContent = "Home Page";
            homeBtn.classList.add("button", "home-btn");
            homeBtn.onclick = () => {
            window.location.href = "index.html";
            };
            restartBtn.style.display = 'block';
            restartBtn.insertAdjacentElement("afterend", homeBtn);
    }
}

restartBtn.addEventListener('click', () => {
            currentQuestion = 0;
            score = 0;
            timeLeft=30;
            timerElement.textContent= timeLeft;
            timerBox.style.display='block';

            questionElement.style.display = 'block';
            optionsElement.style.display = 'flex'; 
            resultElement.style.display = 'none';
            restartBtn.style.display = 'none';
        
            loadQuestion();
        });

if (window.location.pathname.includes("game.html")) {
    loadQuestionsByMode();
}
