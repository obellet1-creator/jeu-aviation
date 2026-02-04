// Charger les questions
fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    // Tirage aléatoire d'une question
    const question = data[Math.floor(Math.random() * data.length)];
    document.getElementById('question').innerText = question.question;

    // Afficher la réponse au clic
    document.getElementById('showAnswer').addEventListener('click', () => {
      document.getElementById('answer').innerText = question.answer;
    });
  })
  .catch(error => console.error('Erreur:', error));


