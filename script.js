let questions = [];
let currentQuestion = null;
let timer = null;
const TIME_LIMIT = 30; // secondes

// Charger les questions depuis questions.json
fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    showNewQuestion();
  })
  .catch(error => {
    console.error('Erreur de chargement des questions :', error);
  });

// Afficher une nouvelle question
function showNewQuestion() {
  if (questions.length === 0) return;

  // Tirage aléatoire
  currentQuestion = questions[Math.floor(Math.random() * questions.length)];

  // Affichage question
  document.getElementById('question').innerText = currentQuestion.question;
  document.getElementById('answer').innerText = '';

  // Reset timer
  clearTimeout(timer);

  // Lancer timer de 30 secondes
  timer = setTimeout(() => {
    showAnswer();
  }, TIME_LIMIT * 1000);
}

// Afficher la réponse
function showAnswer() {
  if (!currentQuestion) return;
  document.getElementById('answer').innerText = currentQuestion.answer;
  clearTimeout(timer);
}

// Bouton : afficher la réponse immédiatement
document.getElemen
