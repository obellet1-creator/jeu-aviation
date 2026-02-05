let questions = [];
let currentIndex = 0;
let timerTimeout = null;
let timerInterval = null;
const TIME_LIMIT = 30;

// Sélection des éléments
const timerNumber = document.getElementById('timer-number');
const timerCircle = document.getElementById('timer-circle');
const circleRadius = 50;
const circleCircumference = 2 * Math.PI * circleRadius;

timerCircle.style.strokeDasharray = circleCircumference;
timerCircle.style.strokeDashoffset = 0;

// Fonction de shuffle (Fisher-Yates)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Charger les questions
fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    if (!Array.isArray(data) || data.length === 0) throw new Error('questions.json vide ou invalide');
    questions = data;
    shuffleArray(questions); // Mélange les questions
    currentIndex = 0;
    showNewQuestion();
  })
  .catch(error => {
    document.getElementById('question').innerText = 'Erreur de chargement des questions';
    console.error(error);
  });

function showNewQuestion() {
  clearTimeout(timerTimeout);
  clearInterval(timerInterval);

  if (currentIndex >= questions.length) {
    document.getElementById('question').innerText = 'Toutes les questions ont été posées !';
    document.getElementById('answer').innerText = '';
    timerNumber.innerText = '0';
    timerCircle.style.strokeDashoffset = circleCircumference;
    return;
  }

  const currentQuestion = questions[currentIndex];

  // Affichage question + réponse vide
  document.getElementById('question').innerText = currentQuestion.question;
  document.getElementById('answer').innerText = '';

  // Reset compteur
  let timeLeft = TIME_LIMIT;
  timerNumber.innerText = timeLeft;
  timerCircle.style.strokeDashoffset = 0;

  // Intervalle pour le décompte visuel
  timerInterval = setInterval(() => {
    timeLeft--;
    timerNumber.innerText = timeLeft;

    const offset = circleCircumference * (1 - timeLeft / TIME_LIMIT);
    timerCircle.style.strokeDashoffset = offset;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
    }
  }, 1000);

  // Afficher réponse automatiquement
  timerTimeout = setTimeout(() => {
    showAnswer(currentQuestion);
  }, TIME_LIMIT * 1000);
}

function showAnswer(question = null) {
  if (!question) question = questions[currentIndex];
  document.getElementById('answer').innerText = question.answer;
  clearInterval(timerInterval);
  timerNumber.innerText = "0";
  timerCircle.style.strokeDashoffset = circleCircumference;

  // Flash rapide pour signaler la fin
  timerCircle.style.transition = 'stroke 0.2s';
  timerCircle.style.stroke = '#27ae60';
  setTimeout(() => {
    timerCircle.style.stroke = '#c0392b';
    timerCircle.style.transition = 'stroke 0.3s';
  }, 300);
}

// Boutons
document.getElementById('showAnswer').addEventListener('click', () => showAnswer());
document.getElementById('nextQuestion').addEventListener('click', () => {
  currentIndex++;
  showNewQuestion();
});

