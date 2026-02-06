// =======================
// VARIABLES GLOBALES
// =======================
let questions = [];
let currentQuestion = null;

let timeLeft = 30;
let timerInterval = null;

const TOTAL_TIME = 30;
const CIRCLE_LENGTH = 314; // 2 * PI * 50

// =======================
// ÉLÉMENTS DOM
// =======================
const questionDiv = document.getElementById("question");
const answerDiv = document.getElementById("answer");

const showAnswerBtn = document.getElementById("showAnswer");
const nextQuestionBtn = document.getElementById("nextQuestion");

const timerNumber = document.getElementById("timer-number");
const timerCircle = document.getElementById("timer-circle");

// Dé virtuel
const rollDiceBtn = document.getElementById("rollDice");
const diceResult = document.getElementById("dice-result");

// =======================
// CHARGEMENT DES QUESTIONS
// =======================
fetch("questions.json")
  .then(response => response.json())
  .then(data => {
    questions = data;
    loadNewQuestion();
  })
  .catch(error => {
    questionDiv.textContent = "Erreur de chargement des questions.";
    console.error(error);
  });

// =======================
// FONCTIONS PRINCIPALES
// =======================
function loadNewQuestion() {
  if (questions.length === 0) {
    questionDiv.textContent = "Aucune question disponible.";
    return;
  }

  resetTimer();

  currentQuestion = questions[Math.floor(Math.random() * questions.length)];

  questionDiv.textContent = currentQuestion.question;
  answerDiv.textContent = "";

  startTimer();
}

function showAnswer() {
  if (currentQuestion) {
    answerDiv.textContent = currentQuestion.answer;
  }
}

// =======================
// TIMER
// =======================
function startTimer() {
  timeLeft = TOTAL_TIME;
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showAnswer();
    }
  }, 1000);
}

function resetTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  timeLeft = TOTAL_TIME;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  timerNumber.textContent = timeLeft;

  const progress = timeLeft / TOTAL_TIME;
  const offset = CIRCLE_LENGTH * (1 - progress);
  timerCircle.style.strokeDashoffset = offset;
}

// =======================
// ÉVÉNEMENTS
// =======================
showAnswerBtn.addEventListener("click", showAnswer);
nextQuestionBtn.addEventListener("click", loadNewQuestion);

// =======================
// DÉ VIRTUEL
// =======================
rollDiceBtn.addEventListener("click", () => {
  const value = Math.floor(Math.random() * 6) + 1;
  diceResult.textContent = value;
});
