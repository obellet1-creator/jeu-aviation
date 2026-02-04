let questions = [];
let currentQuestion = null;
let timer = null;
let countdown = null;
const TIME_LIMIT = 30; // secondes

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
  clearTimeout(timer);
  clearInterval(countdown);

  currentQuestion = questions[Math.floor(Math.random() * questions.length)];

  document.getElementById('question').innerText = currentQuestion.question;
  document.getElementById('answer').innerText = '';

  // Timer affiché
  let timeLeft = TIME_LIMIT;
  document.getElementById('timer').innerText = timeLeft;

  countdown = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(countdown);
    }
  }, 1000);

  // Afficher réponse automatiquement au bout de TIME_LIMIT secondes
  timer = setTimeout(showAnswer, TIME_LIMIT * 1000);
}

// Afficher la réponse
function showAnswer() {
  if (currentQuestion) {
    document.getElementById('answer').innerText = currentQuestion.answer;
  }
  clearInterval(countdown);
  document.getElementById('timer').innerText = "0";
}

// Bouton : afficher la réponse immédiatement
document.getElementById('showAnswer').addEventListener('click', showAnswer);

// Bouton : nouvelle question
document.getElementById('nextQuestion').addEventListener('click', showNewQuestion);
