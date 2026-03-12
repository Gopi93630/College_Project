// TNPSC Online Exam Script

// Timer
let timeLeft = 60;

let timer = setInterval(function () {

    timeLeft--;

    document.getElementById("time").textContent = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(timer);
        submitQuiz();
    }

}, 1000);


// Submit Quiz Function
function submitQuiz() {

    clearInterval(timer);

    let score = 0;

    let form = document.forms["quizForm"];

    let answers = ["q1", "q2", "q3"];


    for (let i = 0; i < answers.length; i++) {

        let q = form[answers[i]];

        for (let j = 0; j < q.length; j++) {

            if (q[j].checked) {

                score += Number(q[j].value);

            }

        }

    }

    // Store score in LocalStorage
    localStorage.setItem("score", score);
    localStorage.setItem("total", answers.length);

    // Redirect to result page
    window.location.href = "result.html";

}