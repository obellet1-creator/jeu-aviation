document.addEventListener("DOMContentLoaded", function() {

  // ==========================
  // VARIABLES GLOBALES
  // ==========================
  let questions = [];
  let currentQuestion = null;

  const timerDuration = 30;
  let timeLeft = timerDuration;
  let timerInterval = null;

  const circle = document.getElementById("timer-circle");
  const timerNumber = document.getElementById("timer-number");
  const circumference = 2 * Math.PI * 50;

  // 🔊 Son du timer (musique)
  const tickSound = new Audio("sounds/tick.mp3");
  tickSound.volume = 0.3;
  tickSound.loop = true;

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
      loadNewQuestion(false); // première question sans timer
    })
    .catch(error => {
      document.getElementById("question").textContent =
        "Erreur de chargement des questions";
      console.error(error);
    });

  // ==========================
  // QUESTIONS
  // ==========================
  function loadNewQuestion(startTimerFlag = true) {
    if (questions.length === 0) return;

    currentQuestion =
      questions[Math.floor(Math.random() * questions.length)];

    document.getElementById("question").textContent =
      currentQuestion.question;
    document.getElementById("answer").textContent = "";

    if (startTimerFlag) {
      resetTimer();
      startTimer();
    }
  }

  function showAnswer() {
    if (!currentQuestion) return;
    document.getElementById("answer").textContent =
      "Réponse : " + currentQuestion.answer;
  }

  // ==========================
  // TIMER (MUSIQUE CONTINUE)
  // ==========================
  function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = timerDuration;
    updateTimerDisplay();
    tickSound.pause();
    tickSound.currentTime = 0;
  }

  function startTimer() {
    clearInterval(timerInterval);
    tickSound.play();

    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        tickSound.pause();
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
  // 🎲 DÉ AVEC ANIMATION + ÉCLAT FINAL
  // ==========================
  function rollDice() {
    const diceResult = document.getElementById("dice-result");
    const finalValue = Math.floor(Math.random() * 6) + 1;
    let count = 0;

    // reset effet victoire
    diceResult.classList.remove("dice-win");

    const interval = setInterval(() => {
      diceResult.textContent = Math.floor(Math.random() * 6) + 1;
      count++;

      if (count >= 10) {
        clearInterval(interval);
        diceResult.textContent = finalValue;

        // ✨ éclat victoire
        diceResult.classList.add("dice-win");
      }
    }, 50);
  }

  // ==========================
  // BOUTONS
  // ==========================
  document.getElementById("rollDice").addEventListener("click", rollDice);
  document.getElementById("nextQuestion").addEventListener("click", () => loadNewQuestion(true));
  document.getElementById("showAnswer").addEventListener("click", showAnswer);

});
