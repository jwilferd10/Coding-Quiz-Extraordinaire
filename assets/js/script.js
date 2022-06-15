// Starting off by creating the skeleton of our HTML and JavaScript. 
// Reminder: Create an if statement for the wrong answers. If the answer is wrong, -10 points/time. Else the test continues normally. Use alert to notify if right or wrong
// First: Set up the questions and find a way to make it progress
// Second: Set up a timer and enable it when the quiz begins
// Third: Refactored the script
// Fourth: undefined bug within line 62 and 103, try to fix this. Also add a high-score list at the end of the test.

// !!REMEMBER: THESE ARE GLOBAL!! //
let questionEl = document.getElementById("question");
let answerEl = document.getElementById("answers");
let scoreEl = document.getElementById("results");
let answer;
// This is our timer,  plugs into the HTML 
let timerEl = document.getElementById("timer");
// This is the amount of seconds in our timer, it counts down
let timeLeft = 60; 
// questionNumber is where our questions will start at.
let questionNumber = -1; // Set to -1, setting to 0 will skip a question
// These are our questions, for reading and length purposes it's condensed together. !!THESE QUESTIONS ARE PLACEHOLDERS!!
const testQuestionsArr = [
    { question: "What is 1+1?", answers: [ "1","2","6","9" ], correctAnswer: "2" },
    { question: "What is 2+2?", answers: [ "4","6","8","12" ], correctAnswer: "4" },
    { question: "What is 3x3?", answers: [ "3","6","9","12" ], correctAnswer: "9" },
    { question: "What is 4x4?", answers: [ "2","4","8","16" ], correctAnswer: "16" }
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
    scoreEl.textContent = "Your Score: " + timeLeft;
};

// Button to start counter and quiz
document.querySelector("#start-btn").addEventListener("click", liveQuiz);

