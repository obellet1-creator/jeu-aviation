let questions = [];
let currentQuestion;

// Charger les questions depuis questions.json
fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    showNewQuestion(); // Afficher la première question
  })
  .catch(error => console.error('Erreur:', error));

function showNewQuestion() {
  // Tirage aléatoire d'une question
  currentQuestion = questions[Math.floor(Math.random() * questions.length)];
  document.getElementById('question').innerText = currentQuestion.question;
  document.getElementById('answer').innerText = '';

  // Supprimer les anciens timers s'il y en avait
  clearTimeout(window.answerTimer);

  // Lancer timer de 30 secondes pour afficher la réponse automatiquement
  window.answerTimer = setTimeout(() => {
    document.getElementById('answer').innerText = currentQuestion.answer;
  }, 30000); // 30000 ms = 30 secondes
}

// Bouton "Afficher la réponse"
document.getElementById('showAnswer').addEventListener('click', () => {
  clearTimeout(window.answerTimer); // Arrêter le timer si cliqué avant
  document.getElementById('answer').innerText = currentQuestion.answer;
});

// Bouton "Nouvelle question"
document.getElementById('nextQuestion').addEventListener('click', () => {
  showNewQuestion();
});




