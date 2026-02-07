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

  currentQuestion = questions[Math.floor(Math.random() * questions.length)];

  document.getElementById("question").textContent = currentQuestion.question;
  document.getElementById("answer").textContent = "";

  // ⚠️ Plus de timer automatique
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

  timeLeft = timerDuration; // redémarre toujours à 30 s
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showAnswer(); // affichage automatique à 0
    }
  }, 1000);
}

function updateTimerDisplay() {
  timerNumber.textContent = timeLeft;
  const offset = circumference - (timeLeft / timerDuration) * circumference;
  circle.style.strokeDashoffset = offset;
}

// ==========================
// DÉ VIRTUEL (COMPLÈTEMENT INDÉPENDANT)
// ==========================
function rollDice() {
  const diceValue = Math.floor(Math.random() * 6) + 1;
  document.getElementById("dice-result").textContent = diceValue;
  // ⚠️ Ne fait rien d’autre
}

// ==========================
// BOUTONS
// ==========================
document.getElementById("rollDice").addEventListener("click", rollDice);
document.getElementById("nextQuestion").addEventListener("click", loadNewQuestion);
document.getElementById("showAnswer").addEventListener("click", showAnswer);

// ==========================
// BOUTON OPTIONNEL POUR LANCER LE TIMER MANUELLEMENT
// ==========================
const startTimerBtn = document.getElementById("startTimer");
if(startTimerBtn){
  startTimerBtn.addEventListener("click", startTimer);
}
