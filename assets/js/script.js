// Starting off by creating the skeleton of our HTML and JavaScript. 
// Reminder: Create an if statement for the wrong answers. If the answer is wrong, -10 points/time. Else the test continues normally. Use alert to notify if right or wrong


// !!REMEMBER: THESE ARE GLOBAL!! //
var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
// MIGHT ADD ANSWERS HERE //
var counter = document.getElementById("counter");
var score = document.getElementById("score");

// These are our questions, for reading purposes it's condensed together. !!THESE QUESTIONS ARE PLACEHOLDERS!!
const testQuestions = [
    { question: "What is 1+1?", answers: { 1: "1", 2: "2", 3: "6", 4: "9" }, correctAnswer: "2" },
    { question: "What is 2+2?", answers: { 1: "4", 2: "6", 3: "8", 4: "12" }, correctAnswer: "1" },
    { question: "What is 3x3?", answers: { 1: "3", 2: "6", 3: "9", 4: "12" }, correctAnswer: "3" },
    { question: "What is 4x4?", answers: { 1: "2", 2: "4", 3: "8", 4: "16" }, correctAnswer: "4" }
];

// Reminder: Anything in here, THIS IS THE QUIZ
function liveQuiz() {
    
}

// Reminder: This kickstarts the quiz.
liveQuiz();

// Reminder: This is the TIMER for the quiz, it will also act as our SCORE
// function timeQuiz() {
//     var timeLeft = 60;
// }

// Reminder: Anything in here executes when the quiz is OVER 
function endQuiz() {}

// Reminder: LocalStorage should go here, takes us back to Quiz Start or CLEARS HIGH SCORES
function checkScore() {}


// Practice a start button 

