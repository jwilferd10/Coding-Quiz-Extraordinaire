const questionEl = document.querySelector("#question");
const potentialAnswersEl = document.querySelector("#potentialAnswers");
const scoreEl = document.querySelector("#finalResults");
const highScoresListEl = document.querySelector("#highScoresList");
const timerEl = document.querySelector("#timer");
const initialsInput = document.querySelector('#initials');
const saveButtonEl = document.querySelector('#save');
const msgDiv = document.querySelector('#msg');
const homeBtnEl = document.querySelector("#homebtn");

let progressEl = document.getElementsByClassName("progress") [0]
let userInfoArr = JSON.parse(localStorage.getItem('userInfoArr')) || [];

let timeLeft = 60;
let questionNumber = -1; // questions will start at -1, using 0 will skip a question

// quiz questions array with answer selections and correct answer
const testQuestionsArr = [
    { question: "Commonly used data types DO Not Include:", answers: [ "1. strings","2. booleans","3. alerts","4. numbers" ], correctAnswer: "3. alerts" },
    { question: "The condition in an if/else statement is enclosed with ______.", answers: [ "1. quotes","2. curly brackets","3. parenthesis","4. square brackets" ], correctAnswer: "2. curly brackets" },
    { question: "Arrays in JavaScript can be used to store", answers: [ "1. numbers and strings","2. other arrays","3. booleans","4. all of the above" ], correctAnswer: "4. all of the above" },
    { question: "String values must be enclosed within _____ when being assigned to variables.", answers: [ "1. commas","2. curly brackets","3. quotes","4. parenthesis" ], correctAnswer: "3. quotes" },
    { question: "A very useful tool used during development and debugging for printing content to the debugger is:", answers: [ "1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"], correctAnswer: "4. console.log" }
];

let startQuiz = () => {
    // When the quiz is started, hide the intro and display the quiz to users
    document.getElementById("intro").classList.add("hidden");  
    document.getElementById("quiz").classList.remove("hidden");
    
    // start countdown
    startTimer();
    // present questions from array
    quizQuestions();
};

let startTimer = () => {
    let timer = setInterval(function() {
        // decrement timeLeft
        timeLeft --;

        timerEl.textContent = "Time: " + timeLeft + " seconds remaining";

        if (timeLeft <= 0 || questionNumber === testQuestionsArr.length) {
            clearInterval(timer);
            setTimeout(endQuiz, 200);
        }
    }, 1000);
};

const quizQuestions = () => {
    // increment through array
    questionNumber++

    // questionEl takes the textContent from questionNumber and displays the current question from the array
    questionEl.textContent = testQuestionsArr[questionNumber].question
     
    generateBtns();
};

const generateBtns = () => {
    // potentialAnswersEl is an empty string & Then answersObj displays our list of possible answers from the array of objects & then reaches for our correctAnswer in the array
    potentialAnswersEl.innerHTML = "";
    let answersObj = testQuestionsArr[questionNumber].answers;
    answer = testQuestionsArr[questionNumber].correctAnswer;
    
    // display the array of possible answers
    for (let i = 0; i < answersObj.length; i++) {
        let answerChoices = document.createElement("button");
        answerChoices.className = "potentialAnswer";
        answerChoices.textContent = answersObj[i];
        answerBtn = potentialAnswersEl.appendChild(answerChoices);
        answerBtn.addEventListener("click", function(event) {
            iterateQuestion();
        });
    };  
};

// connected to the answer buttons generated in the above code
const iterateQuestion = () => {
    // when the button is clicked this furthers users progress
    if (answer === event.target.textContent) {
        // Let user know answer is correct
        progressEl.textContent = "Correct Answer!"
        setTimeout(hideProgress, 3000);
        showProgress();
    }
    else { 
        // Let user know answer is incorrect
        progressEl.textContent = "Incorrect Answer!";;
        setTimeout(hideProgress, 3000);
        timeLeft = timeLeft - 10;
        showProgress();
    }
    // continue to iterate through next questions
    quizQuestions();
};

// showProgress displays notification whether answer is right or wrong
const showProgress = () => progressEl.removeAttribute("style");

// hideProgress removes the notification after a set amount of time
const hideProgress = () => progressEl.style.display="none";

// show user score after the quiz is complete. Present user option to go back to main page or log current score.
const endQuiz = () => {
    // conceal the quiz when finished & show the results
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("timer").classList.add("hidden");
    document.getElementById("finalResults").classList.remove("hidden");
    
    // if users have <= 0 time left, give them game over screen
    if(timeLeft <= 0) {
        let h2Element = document.createElement('h2');
        h2Element.classList.add('failedQuizStyle')
        h2Element.textContent = "😭 "+ " Better luck next time... " + "😭";
        scoreEl.appendChild(h2Element);

        let scoreInfo = document.createElement('section');
        scoreInfo.textContent = "Your score: " + timeLeft;
        scoreEl.appendChild(scoreInfo);

        let backBtn = document.createElement('button');
        backBtn.classList.add('btn');
        backBtn.textContent = "Back";
        scoreEl.appendChild(backBtn);

        backBtn.addEventListener("click", function() {
            location.reload();
        })

    } else {
        // if score is >0 display score entry
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

        // call ScoreRegistration to bring up the entry page
        enterScoreBtn.addEventListener("click", function() {
           scoreRegistration();
        })
    }
};

// Function to register users score
const scoreRegistration = () => {
    // High-score entry page goes here
    document.getElementById("finalResults").classList.add("hidden");
    document.getElementById("enterScore").classList.remove("hidden");

    // user initials entry
    let scoreNotification = document.createElement('h3');
    scoreNotification.classList.add('alertUserScore');
    scoreNotification.textContent = "Your score: " + timeLeft + " seconds";
    enterScore.appendChild(scoreNotification);

    // Saves user initials
    saveButtonEl.addEventListener('click', function(event) {
        // run saveScore function
        saveScore();
        event.preventDefault();
        document.getElementById("enterScore").classList.add("hidden");
        document.getElementById('savedScore').classList.remove("hidden");
        let enteredInfo = document.createElement('h1');
        enteredInfo.classList.add('alertUserScore');
        enteredInfo.textContent = document.querySelector('#initials').value + ' - ' + timeLeft;
        savedScore.appendChild(enteredInfo);

        let returnBtn = document.createElement('button');
        returnBtn.classList.add('btn');
        returnBtn.classList.add('returnBtn');
        returnBtn.textContent = "Return";
        savedScore.appendChild(returnBtn);

        returnBtn.addEventListener("click", function() {
            location.reload();
        })
    });

    // lets try to return users back to main page
    let returnBtn = document.createElement('button');
    returnBtn.classList.add('btn');
    returnBtn.classList.add('returnBtn');
    returnBtn.textContent = "Return";
    enterScore.appendChild(returnBtn);
 
    // reloads the entire page, resetting the time and the question in the process
    returnBtn.addEventListener("click", function() {
        location.reload();
    })
}

// Function to save users score
const saveScore = () => {
    // Grab the value from initial and timeLeft
    let initialsInput = document.querySelector('#initials').value;
    let finalScore = timeLeft;

    // remind users they need to enter their initials
    if (!initialsInput) {
        alert("You need to enter your initials!");
        return false;
    }

    // userDataObj collects the initials and time left and stores them as an object containing name and time.
    let userDataObj = {
        name: initialsInput,
        time: finalScore
    };

    // userDataObj is then pushed into the empty array, userInfoArr
    userInfoArr.push(userDataObj);

    // use sort() to flesh out the userInfoArr to pick the highest answer
    userInfoArr.sort (function highestScore(a, b) {
        return b.time - a.time;
    })
    
    // remove anything after index 5
    userInfoArr.splice(5);

    // update the high scores array
    localStorage.setItem("userInfoArr", JSON.stringify(userInfoArr));

    if (saveScore) {
        window.alert("Your score has successfully been saved!");
    }
};

// create a function that shows high scores from localStorage
const showHighScore = () => {
    // clicking the high score button reveals the CSS, hides the intro
    document.getElementById("scoreSectionID").classList.remove("hidden");
    document.getElementById("intro").classList.add("hidden");
    document.getElementById("timer").classList.add("hidden");

    let highScores = localStorage.getItem("userInfoArr");

    if (!highScores) {
        return false;
    } 

    highScores = JSON.parse(highScores);

    // iterate through the array and display data in a list, from name - time.
    for (var i = 0; i < highScores.length; i++) {
        let listElement = document.createElement('li');
        listElement.className = "userScore"
        listElement.innerHTML = highScores[i].name + " - " + highScores[i].time;
        highScoresListEl.appendChild(listElement);
    }
};

// add an event listener to take users home
homeBtnEl.addEventListener("click", () => location.reload());
document.querySelector("#start-btn").addEventListener("click", startQuiz);
document.querySelector("#highscore").addEventListener("click", showHighScore)