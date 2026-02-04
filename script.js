let questions = [];
let currentQuestion = null;
let timerTimeout = null;
let timerInterval = null;
const TIME_LIMIT = 25; // secondes

// Charger les questions depuis JSON
fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('questions.json vide ou invalide');
    }
    questions = data;
    showNewQuestion();
  })
  .catch(error => {
    document.getElementById('question').innerText = 'Erreur de chargement des questions';
    console.error(error);
  });

// Afficher une nouvelle question
function showNewQuestion() {
  // Arrêter tout ancien timer
  clearTimeout(timerTimeout);
  clearInterval(timerInterval);

  // Tirage aléatoire
  currentQuestion = questions[Math.floor(Math.random() * questions.length)];

  // Affichage question + réponse vide
  document.getElementById('question').innerText = currentQuestion.question;
  document.getElementById('answer').innerText = '';

  // Initialiser le compteur
  let timeLeft = TIME_LIMIT;
  document.getElementById('timer').innerText = timeLeft;

  // Lancer l'intervalle pour décompte
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
    }
  }, 1000);

  // Afficher réponse automatiquement après TIME_LIMIT secondes
  timerTimeout = setTimeout(() => {
    showAnswer();
  }, TIME_LIMIT * 1000);
}

// Afficher la réponse
function showAnswer() {
  if (currentQuestion) {
    document.getElementById('answer').innerText = currentQuestion.answer;
  }
  // Stopper le compteur si encore actif
  clearInterval(timerInterval);
  document.getElementById('timer').innerText = "0";
}

// Bouton : afficher la réponse immédiatement
document.getElementById('showAnswer').addEventListener('click', showAnswer);

// Bouton : nouvelle question
document.getElementById('nextQuestion').addEventListener('click', showNewQuestion);

