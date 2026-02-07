// ==========================
// VARIABLES GLOBALES
// ==========================
let questions = [];
let currentQuestion = null;

let timerDuration = 30;
let timeLeft = timerDuration;
let timerInterval = null;

const circle = document.getElementById("timer-circle");
const timerNumber = document.getElementById("timer-number");
const circumference = 2 * Math.PI * 50;

// ==========================
// INITIALISATION TIMER
// ==========================
circle.style.strokeDasharray = circumference;

// ==========================
// CHARGEMENT DES QUESTIONS
// ==========================
fetch("questions.json")
  .then(response => response.json())
  .then(data => {
    questions = data;
    loadNewQuestion();
  })
  .catch(error => {
    document.getElementById("question").textContent =
      "Erreur de chargement des questions";
    console.error(error);
  });

// ==========================
// FONCTIONS QUESTIONS
// ==========================
function loadNewQuestion() {
  if (questions.length === 0) return;

  currentQuestion =
    questions[Math.floor(Math.random() * questions.length)];

  document.getElementById("question").textContent =
    currentQuestion.question;
  document.getElementById("answer").textContent = "";

  resetTimer();
  startTimer();
}

function showAnswer() {
  if (!currentQuestion) return;
  document.getElementById("answer").textContent =
    "Réponse : " + currentQuestion.answer;
}

// ==========================
// TIMER (INDÉPENDANT)
// ==========================
function resetTimer() {
  clearInterval(timerInterval);
  timeLeft = timerDuration;
  updateTimerDisplay();
}

function startTimer() {
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showAnswer();
    }
  }, 1000);
}

function updateTimerDisplay() {
  timerNumber.textContent = timeLeft;

  const offset =
    circumference - (timeLeft / timerDuration) * circumference;

  circle.style.strokeDashoffset = offset;
}

// ==========================
// DÉ VIRTUEL (COMPLÈTEMENT INDÉPENDANT)
// ==========================
function rollDice() {
  const diceValue = Math.floor(Math.random() * 6) + 1;
  document.getElementById("dice-result").textContent = diceValue;

  // ⚠️ Ne déclenche PAS de nouvelle question ni de timer
  // Le dé est uniquement pour le joueur ou les déplacements
}

// ==========================
// BOUTONS
// ==========================
document.getElementById("showAnswer").addEventListener("click", showAnswer);
document.getElementById("nextQuestion").addEventListener("click", loadNewQuestion);
document.getElementById("rollDice").addEventListener("click", rollDice);
