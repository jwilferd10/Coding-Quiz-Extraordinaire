// When the quiz is over, there is an error at at around line 46 (this is possibly because there's nothing left within the array)
let questionEl = document.getElementById("question");
let answerEl = document.getElementById("answers");
let scoreEl = document.getElementById("results");
let timerEl = document.getElementById("timer");
let timeLeft = 60;
let questionNumber = -1; // questions will start at -1, using 0 will skip a question

const testQuestionsArr = [
    { question: "Commonly used data types DO Not Include:", answers: [ "1. strings","2. booleans","3. alerts","4. numbers" ], correctAnswer: "3. alerts" },
    { question: "The condition in an if/else statement is enclosed with ______.", answers: [ "1. quotes","2. curly brackets","3. parenthesis","4. square brackets" ], correctAnswer: "2. curly brackets" },
    { question: "Arrays in JavaScript can be used to store", answers: [ "1. numbers an strings","2. other arrays","3. booleans","4. all of the above" ], correctAnswer: "4. all of the above" },
    { question: "String values must be enclosed within _____ when being assigned to variables.", answers: [ "1. commas","2. curly brackets","3. quotes","4. parenthesis" ], correctAnswer: "3. quotes" },
    { question: "A very useful tool used during development and debugging for printing content to the debugger is:", answers: [ "1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"], correctAnswer: "4. console.log" }
];

let startQuiz = function() {
    // When the quiz is started, hide the intro and display the quiz to users
    document.getElementById("intro").classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");
    
    startTimer();

    quizQuestions();
};

let startTimer = function() {
    let timer = setInterval(function() {
        // decrement timeLeft
        timeLeft --;

        timerEl.textContent = "Time: " + timeLeft + " seconds remaining";

        if (timeLeft === 0 || questionNumber === testQuestionsArr.length) {
            clearInterval(timer);
            setTimeout(showScore, 200);
        }
    }, 1000);
};

let quizQuestions = function() {
    // increment through array
    questionNumber++

    // show's current question
    questionEl.textContent = testQuestionsArr[questionNumber].question
        
    answerEl.innerHTML = "";

    // This displays our list of possible answers
    let answers = testQuestionsArr[questionNumber].answers;

    // This reaches for our correctAnswer in the array
    answer = testQuestionsArr[questionNumber].correctAnswer;

    // display the array of possible answers
    for (let i = 0; i < answers.length; i++) {

        let answerChoices = document.createElement("button");

        answerChoices.className = "potentialAnswer";

        answerChoices.textContent = answers[i];

        answerBtn = answerEl.appendChild(answerChoices);
    }
};

//Answer Choice Buttons
answerEl.addEventListener("click", function(event) {
    let progressEl = document.getElementsByClassName("progress") [0]

    if (answer === event.target.textContent) {
        // Let user know answer is correct
        progressEl.textContent = "Correct Answer!"
        setTimeout(hideProgress, 3000);
        showProgress();
    }
    else { 
        // Let user know answer is incorrect
        progressEl.textContent = "Incorrect Answer!";
        setTimeout(hideProgress, 3000);
        timeLeft = timeLeft - 10;
        showProgress();
    }
    quizQuestions();
});

let showScore = function() {
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("results").classList.remove("hidden");
    scoreEl.textContent = "Your final score is: " + timeLeft;
    
};

let hideProgress = function() {
    let progressEl = document.getElementsByClassName("progress") [0]
    progressEl.style.display="none";
};

let showProgress = function() {
    let progressEl = document.getElementsByClassName("progress") [0]
    progressEl.removeAttribute("style");
};

document.querySelector("#start-btn").addEventListener("click", startQuiz);
