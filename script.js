let questions = [
    { q: "When was TN founded?", options: ["1947", "1956", "1969", "1986"], ans: 1 },
    { q: "Capital of TN?", options: ["Madras", "Coimbatore", "Chennai", "Trichy"], ans: 2 },
    // Add 100+ TNPSC questions here
];
let score = 0, timeLeft = 1800, timerId, currentQ = 0, userAnswers = [];

function login() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    if (user && pass) {
        localStorage.setItem('user', user);
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('examContainer').classList.remove('hidden');
        loadQuestion();
        startTimer();
    } else {
        document.getElementById('message').textContent = 'Fill all fields';
    }
}

function loadQuestion() {
    if (currentQ >= questions.length) {
        document.getElementById('questionContainer').innerHTML = '<p>Exam Complete!</p>';
        return;
    }
    const q = questions[currentQ];
    document.getElementById('questionContainer').innerHTML = `
        <div class="question">
            <p>${currentQ + 1}. ${q.q}</p>
            ${q.options.map((opt, i) => `<label><input type="radio" name="q${currentQ}" value="${i}"> ${opt}</label>`).join('')}
        </div>
    `;
}

function startTimer() {
    timerId = setInterval(() => {
        timeLeft--;
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        document.getElementById('timer').textContent = `Time: ${mins}:${secs.toString().padStart(2, '0')}`;
        if (timeLeft <= 0) {
            submitExam();
        }
    }, 1000);
}

function submitExam() {
    clearInterval(timerId);
    // Collect answers
    for (let i = 0; i < questions.length; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        userAnswers[i] = selected ? parseInt(selected.value) : -1;
        if (userAnswers[i] === questions[i].ans) score++;
    }
    document.getElementById('submitBtn').classList.add('hidden');
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('result').innerHTML = `<h3>Score: ${score}/${questions.length} (${Math.round(score/questions.length*100)}%)</h3>`;
    localStorage.setItem('lastScore', score);
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('user')) {
        // Auto-login for demo
        document.getElementById('username').value = 'test';
        document.getElementById('password').value = '123';
        login();
    }
});
