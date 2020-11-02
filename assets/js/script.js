// Starting off by creating the skeleton of our HTML and JavaScript. 

// !!REMEMBER: THESE ARE GLOBAL!! //
let quizBegin = document.getElementById('start');
let quizContainer = document.getElementById('quiz');

// These are our questions, for reading purposes it's condensed together. !!THESE QUESTIONS ARE PLACEHOLDERS!!
let testQuestions = [
    { question: "What is 1+1?", answers: { 1: "1", 2: "2", 3: "6", 4: "9" }, correctAnswer: "2" },
    { question: "What is 2+2?", answers: { 1: "4", 2: "6", 3: "8", 4: "12" }, correctAnswer: "1" },
    { question: "What is 3x3?", answers: { 1: "3", 2: "6", 3: "9", 4: "12" }, correctAnswer: "3" },
    { question: "What is 4x4?", answers: { 1: "2", 2: "4", 3: "8", 4: "16" }, correctAnswer: "4" }
];

// This is the introduction page, clicking the button should begin quiz
function startQuiz() {}

//Reminder: Anything in here, THIS IS THE QUIZ
function liveQuiz() {}

//Reminder: This kickstarts the quiz
liveQuiz();

//Reminder: This is the TIMER for the quiz
function timeQuiz() {}

//Reminder: Anything in here executes when the quiz is OVER 
function endQuiz() {}

//Reminder: LocalStorage should go here, takes us back to Quiz Start or CLEARS HIGH SCORES
function checkScore() {}