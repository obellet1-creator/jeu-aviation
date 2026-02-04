let currentQuestion = {
  question: "Test du timer : que fait un avion ?",
  answer: "Il vole grâce à la portance des ailes."
};
let timerTimeout = null;
let timerInterval = null;
const TIME_LIMIT = 30;

const timerNumber = document.getElementById('timer-number');
const timerCircle = document.getElementById('timer-circle');
const circleRadius = 50;
const circleCircumference = 2 * Math.PI * circleRadius;
timerCircle.style.strokeDasharray = circleCircumference;
timerCircle.style.strokeDashoffset = 0;

function showNewQuestion() {
  clearTimeout(timerTimeout);
  clearInterval(timerInterval);

  document.getElementById('question').innerText = currentQuestion.question;
  document.getElementById('answer').innerText = '';

  let timeLeft = TIME_LIMIT;
  timerNumber.innerText = timeLeft;
  timerCircle.style.strokeDashoffset = 0;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerNumber.innerText = timeLeft;
    const offset = circleCircumference * (1 - timeLeft / TIME_LIMIT);
    timerCircle.style.strokeDashoffset = offset;
    if (timeLeft <= 0) clearInterval(timerInterval);
  }, 1000);

  timerTimeout = setTimeout(showAnswer, TIME_LIMIT * 1000);
}

function showAnswer() {
  document.getElementById('answer').innerText = currentQuestion.answer;
  clearInterval(timerInterval);
  timerNumber.innerText = "0";
  timerCircle.style.strokeDashoffset = circleCircumference;
}

document.getElementById('showAnswer').addEventListener('click', showAnswer);
document.getElementById('nextQuestion').addEventListener('click', showNewQuestion);

showNewQuestion();
