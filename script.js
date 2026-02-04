let questions = [];
let currentQuestion = null;
let timer = null;
const TIME_LIMIT = 30;

fetch('questions.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Impossible de charger questions.json');
    }
    return response.json();
  })
  .then(data => {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('questions.json est vide ou invalide');
    }
    questions = data;
    showNewQuestion();
  })
  .catch(error => {
    document.getElementById('question').innerText =
      'Erreur de chargement des questions';
    console.error(error);
  });

function showNewQuestion() {
  clearTimeout(timer);

  currentQuestion = questions[Math.floor(Math.random() * questions.length)];

  document.getElementById('question').innerText = currentQuestion.question;
  document.getElementById('answer').innerText = '';

  timer = setTimeout(showAnswer, TIME_LIMIT * 1000);
}

function showAnswer() {
  if (currentQuestion) {
    document.getElementById('answer').innerText = currentQuestion.answer;
  }
}

document.getElementById('showAnswer').addEventListener('click', showAnswer);
document.getElementById('nextQuestion').addEventListener('click', showNewQuestion);


