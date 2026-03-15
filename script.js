/* LOGIN */

function loginUser(){

alert("Login Successful");

window.location.href="index.html";

}


/* QUESTION BANK */

let questions = [

{
question:"Who is the father of Indian Constitution?",
options:["Gandhi","Ambedkar","Nehru","Patel"],
answer:"Ambedkar"
},

{
question:"Capital of Tamil Nadu?",
options:["Madurai","Chennai","Salem","Trichy"],
answer:"Chennai"
},

{
question:"Largest ocean?",
options:["Atlantic","Indian","Pacific","Arctic"],
answer:"Pacific"
}

];


/* LOAD QUESTIONS */

function loadQuestions(){

let container = document.getElementById("quiz-container");

if(!container) return;

questions.forEach((q,index)=>{

let html = `
<div class="question">

<h3>${index+1}. ${q.question}</h3>

<label><input type="radio" name="q${index}" value="${q.options[0]}"> ${q.options[0]}</label><br>

<label><input type="radio" name="q${index}" value="${q.options[1]}"> ${q.options[1]}</label><br>

<label><input type="radio" name="q${index}" value="${q.options[2]}"> ${q.options[2]}</label><br>

<label><input type="radio" name="q${index}" value="${q.options[3]}"> ${q.options[3]}</label>

</div>
`;

container.innerHTML += html;

});

startTimer();

}


/* TIMER */

function startTimer(){

let timerElement = document.getElementById("timer");

if(!timerElement) return;

let time = 600;

let timer = setInterval(function(){

let minutes = Math.floor(time/60);
let seconds = time % 60;

timerElement.innerText =
minutes + ":" + (seconds<10?"0":"") + seconds;

time--;

if(time < 0){

clearInterval(timer);
submitQuiz();

}

},1000);

}


/* SUBMIT QUIZ */

function submitQuiz(){

let score = 0;

questions.forEach((q,index)=>{

let answer = document.querySelector('input[name="q'+index+'"]:checked');

if(answer && answer.value === q.answer){

score++;

}

});

localStorage.setItem("score",score);
localStorage.setItem("total",questions.length);

window.location.href="result.html";

}


/* RESULT PAGE */

function showResult(){

let score = Number(localStorage.getItem("score"));
let total = Number(localStorage.getItem("total"));

let scoreElement = document.getElementById("score");

if(scoreElement){
scoreElement.innerText = "Score: " + score + " / " + total;
}

let chartCanvas = document.getElementById("chart");

if(chartCanvas){

let ctx = chartCanvas.getContext("2d");

new Chart(ctx,{

type:'bar',

data:{
labels:["Correct","Wrong"],
datasets:[{
label:"Performance",
data:[score,total-score]
}]
}

});

}

}