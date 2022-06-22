let questionEl = document.getElementById("question");
let answerEl = document.getElementById("answers");
let scoreEl = document.getElementById("results");
let answer;
let timerEl = document.getElementById("timer");
let timeLeft = 60; 
let questionNumber = -1; // where our questions will start at, set to -1, setting to 0 will skip a question
const testQuestionsArr = [
    { question: "Commonly used data types DO Not Include:", answers: [ "1. strings","2. booleans","3. alerts","4. numbers" ], correctAnswer: "3. alerts" },
    { question: "The condition in an if/else statement is enclosed with ______.", answers: [ "1. quotes","2. curly brackets","3. parenthesis","4. square brackets" ], correctAnswer: "2. curly brackets" },
    { question: "Arrays in JavaScript can be used to store", answers: [ "1. numbers an strings","2. other arrays","3. booleans","4. all of the above" ], correctAnswer: "4. all of the above" },
    { question: "String values must be enclosed within _____ when being assigned to variables.", answers: [ "1. commas","2. curly brackets","3. quotes","4. parenthesis" ], correctAnswer: "3. quotes" },
    { question: "A very useful tool used during development and debugging for printing content to the debugger is:", answers: [ "1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"], correctAnswer: "4. console.log" }
];

// Everything within here is going to start our timer and display our quiz
function liveQuiz() {
    // After starting quiz the intro is hidden
    document.getElementById("intro").classList.add("hidden");
    // This removes hidden, showing the quiz
    document.getElementById("quiz").classList.remove("hidden");

    // Starting the timer
    startTimer();

    // Displays the questions to the user
    quizQuestions();
};

// Everything within this function relates to quiz timer
function startTimer() {
        let timer = setInterval(function() {
        // Ticks down
        timeLeft --;
        // Display visual reminder for user
        timerEl.textContent = "Time: " + timeLeft + " seconds remaining";
        // if statement executes when time has ran out
        if(timeLeft === 0 || questionNumber === testQuestionsArr.length) {
            clearInterval(timer);
            setTimeout(showScore, 200);
        }
    }, 1000);
};

// This sets the questions and also buttons containing our answers
function quizQuestions() {
    
    questionNumber++

    // This presents our question as a textContent to the user.
    questionEl.textContent = testQuestionsArr[questionNumber].question
        
    answerEl.innerHTML = "";

    // This displays our list of possible answers
    let answers = testQuestionsArr[questionNumber].answers;

    // This reaches for our correctAnswer in the array
    answer = testQuestionsArr[questionNumber].correctAnswer;

    // Using a local variable within for, nextAnswer generates buttons our answers
    for (let i = 0; i < answers.length; i++) {
        // nextAnswer is creating a button element on the document
        let nextAnswer = document.createElement("button");
        nextAnswer.className = "potentialAnswer";
        // nextAnswer is reaching into our array, preparing our answers for next stage
        nextAnswer.textContent = answers[i];
        // Remember: This is what appends our button to the webpage
        answerBtn = answerEl.appendChild(nextAnswer);
    }
};

//Answer Choice Buttons
answerEl.addEventListener("click", function(event) {
    let progressEl = document.getElementsByClassName("progress") [0]

    if (answer === event.target.textContent) {
        // Let user know answer is correct
        progressEl.textContent = "Correct Answer!"
        // Sets the amount of time message is displayed
        setTimeout(hideProgress, 3000);
        showProgress();
    }
    else { 
        // Let user know answer is incorrect
        progressEl.textContent = "Incorrect Answer!";
        // Sets the amount of time message is displayed
        setTimeout(hideProgress, 3000);
        // Subtract ten seconds from time left
        timeLeft = timeLeft - 10;
        showProgress();
    }
    quizQuestions();
});

// progress connects to the html class. This is VERY important in order to 'progress' the quiz!!
function hideProgress() {
    let progressEl = document.getElementsByClassName("progress") [0]
    progressEl.style.display="none";
};

// When this is called it's removing the none attribute
function showProgress() {
    let progressEl = document.getElementsByClassName("progress") [0]
    progressEl.removeAttribute("style");
};

// progress connects to the html class. This is VERY important in order to 'progress' the quiz!!

// Once the quiz has been completed, present their results
let showScore = function() {
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("results").classList.remove("hidden");
    scoreEl.textContent = "Your final score is: " + timeLeft;
};

// Button to start counter and quiz
document.querySelector("#start-btn").addEventListener("click", liveQuiz);

