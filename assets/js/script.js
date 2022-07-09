// When the quiz is over, there is an error at at around line 46 (this is possibly because there's nothing left within the array)
let questionEl = document.getElementById("question");
let answerEl = document.getElementById("answers");
let scoreEl = document.getElementById("finalResults");
let timerEl = document.getElementById("timer");
let timeLeft = 60;
let questionNumber = -1; // questions will start at -1, using 0 will skip a question

let initialsInput = document.querySelector('#initials');
let saveButton = document.querySelector('#save');
let msgDiv = document.querySelector('#msg');

let userInfoArr = [];
let totalScores = 10;



// quiz questions array with answer selections and correct answer
const testQuestionsArr = [
    { question: "Commonly used data types DO Not Include:", answers: [ "1. strings","2. booleans","3. alerts","4. numbers" ], correctAnswer: "3. alerts" },
    // { question: "The condition in an if/else statement is enclosed with ______.", answers: [ "1. quotes","2. curly brackets","3. parenthesis","4. square brackets" ], correctAnswer: "2. curly brackets" },
    // { question: "Arrays in JavaScript can be used to store", answers: [ "1. numbers and strings","2. other arrays","3. booleans","4. all of the above" ], correctAnswer: "4. all of the above" },
    // { question: "String values must be enclosed within _____ when being assigned to variables.", answers: [ "1. commas","2. curly brackets","3. quotes","4. parenthesis" ], correctAnswer: "3. quotes" },
    // { question: "A very useful tool used during development and debugging for printing content to the debugger is:", answers: [ "1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"], correctAnswer: "4. console.log" }
];

let startQuiz = function() {
    // When the quiz is started, hide the intro and display the quiz to users
    document.getElementById("intro").classList.add("hidden");  
    document.getElementById("quiz").classList.remove("hidden");
    
    // start countdown
    startTimer();
    // present questions from array
    quizQuestions();
};

let startTimer = function() {
    let timer = setInterval(function() {
        // decrement timeLeft
        timeLeft --;

        timerEl.textContent = "Time: " + timeLeft + " seconds remaining";

        if (timeLeft === 0 || questionNumber === testQuestionsArr.length) {
            clearInterval(timer);
            setTimeout(endQuiz, 200);
        }
    }, 1000);
};

let quizQuestions = function() {
    // increment through array
    questionNumber++

    // questionEl takes the textContent from questionNumber and displays the current question from the array
    questionEl.textContent = testQuestionsArr[questionNumber].question
    
    // as users progress onto the next question, this removes the last questions answers and allows the next batch of answers to appear.
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

// connected to the answer buttons generated in the above code
answerEl.addEventListener("click", function(event) {
    // when the button is clicked this furthers users progress
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
    // continue to iterate through next questions
    quizQuestions();
});

// showProgress displays notification whether answer is right or wrong
let showProgress = function() {
    let progressEl = document.getElementsByClassName("progress") [0]
    progressEl.removeAttribute("style");
};

// hideProgress removes the notification after a set amount of time
let hideProgress = function() {
    let progressEl = document.getElementsByClassName("progress") [0]
    progressEl.style.display="none";
};

// show user score after the quiz is complete. Present user option to go back to main page or log current score.
let endQuiz = function() {
    // conceal the quiz when finished & show the results
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("finalResults").classList.remove("hidden");

    let h2Element = document.createElement('h2');
    h2Element.textContent = "All done! Let's check your time:";
    scoreEl.appendChild(h2Element);

    // show user final score
    let scoreInfo = document.createElement('section');
    scoreInfo.textContent = "Your final score is " + timeLeft + " seconds";
    scoreEl.appendChild(scoreInfo);

    // bring user back to main page
    let mainPageBtn = document.createElement('button');
    mainPageBtn.classList.add('btn');
    mainPageBtn.textContent = "Back To Main Page"
    scoreEl.appendChild(mainPageBtn);

    // reloads the entire page, resetting the time and the question in the process
    mainPageBtn.addEventListener("click", function() {
        location.reload();
    })

    // high-score entry page 
    let enterScoreBtn = document.createElement('button');
    enterScoreBtn.classList.add('btn');
    enterScoreBtn.textContent = "Enter My Score"
    scoreEl.appendChild(enterScoreBtn);

    enterScoreBtn.addEventListener("click", function() {
        // High-score entry page goes here
        document.getElementById("finalResults").classList.add("hidden");
        document.getElementById("highscore").classList.add("hidden");
        document.getElementById("timer").classList.add("hidden");
        document.getElementById("enterScore").classList.remove("hidden");

        // user initials entry
        let scoreNotification = document.createElement('h3');
        scoreNotification.textContent = "Your score: " + timeLeft + " seconds";
        enterScore.appendChild(scoreNotification);

        // let finalScore = timeLeft;
        
        // Saves user initials
        saveButton.addEventListener('click', function(event) {
            event.preventDefault();
            let initialsInput = document.querySelector('#initials').value;
            let finalScore = timeLeft;

            if (!initialsInput) {
                alert("You need to enter your initials!");
                return false;
            }

            let userDataObj = {
                name: initialsInput,
                time: finalScore
            };

            userInfoArr.push(userDataObj);

            // use sort() to flesh out the userInfoArr to pick the highest answer
            userInfoArr.sort (function highestScore(a, b) {
                return b.time - a.time;
            })
            
            // at index 10 remove anything after
            userInfoArr.splice(10);

            // check to see if userDataObj is working correctly, it is.
            console.log(userDataObj);
            // Let's see what's inside the array
            console.log(userInfoArr);

            // update the high scores array
            localStorage.setItem("userInfoArr", JSON.stringify(userInfoArr));
        });

        // lets try to return users back to main page
        let returnBtn = document.createElement('button');
        returnBtn.classList.add('btn');
        returnBtn.textContent = "Return";
        enterScore.appendChild(returnBtn);
        
        // reloads the entire page, resetting the time and the question in the process
        returnBtn.addEventListener("click", function() {
            location.reload();
        })
    })
};

// let loadHighScore = function() {
//     let loadScore = localStorage.getItem("userInfoArr");
//     if (!userInfoArr) {
//         return false;
//     }
//     console.log("Thank goodness, your saves have been found!");

//     loadScore = JSON.parse(loadScore)

//     for (let i = 0; i < loadScore.length; i++) {
        
        
//     }
// }

document.querySelector("#start-btn").addEventListener("click", startQuiz);

// document.addEventListener("click", showHighScore)