// Global querySelectors
const questionEl = document.querySelector("#question");
const potentialAnswersEl = document.querySelector("#potentialAnswers");
const scoreEl = document.querySelector("#finalResults");
const highScoresListEl = document.querySelector("#highScoresList");
const timerEl = document.querySelector("#timer");
const initialsInput = document.querySelector('#initials');
const saveButtonEl = document.querySelector('#save');
const msgDiv = document.querySelector('#msg');
const homeBtnEl = document.querySelector("#homebtn");
const progressEl = document.querySelector(".progress");

// Global quiz variables
let timeLeft = 60;
let questionNumber = 0;
let quizEnded = false;
let progressTimeout;

// localStorage 
const userInfoArr = JSON.parse(localStorage.getItem('userInfoArr')) || [];

// quiz questions array with answer selections and correct answer
const testQuestionsArr = [
    { question: "Commonly used data types DO Not Include:", answers: [ "1. strings","2. booleans","3. alerts","4. numbers" ], correctAnswer: "3. alerts" },
    { question: "The condition in an if/else statement is enclosed with ______.", answers: [ "1. quotes","2. curly brackets","3. parenthesis","4. square brackets" ], correctAnswer: "2. curly brackets" },
    { question: "Arrays in JavaScript can be used to store", answers: [ "1. numbers and strings","2. other arrays","3. booleans","4. all of the above" ], correctAnswer: "4. all of the above" },
    { question: "String values must be enclosed within _____ when being assigned to variables.", answers: [ "1. commas","2. curly brackets","3. quotes","4. parenthesis" ], correctAnswer: "3. quotes" },
    { question: "A very useful tool used during development and debugging for printing content to the debugger is:", answers: [ "1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"], correctAnswer: "4. console.log" }
];

const startQuiz = () => {
    // When the quiz is started, hide the intro and display the quiz to users
    document.getElementById("intro").classList.add("hidden");  
    document.getElementById("quiz").classList.remove("hidden");
    
    // start countdown
    startTimer();
    // present questions from array
    quizQuestions();
};

const startTimer = () => {
    const timer = setInterval(() => {
        timeLeft --;
        timerEl.textContent = "Time: " + timeLeft + " seconds remaining";

        if (timeLeft <= 0 || questionNumber === testQuestionsArr.length) {
            clearInterval(timer);
            if (!quizEnded) {
                endQuiz();
                // Set quizEnded to true to prevent repeated endQuiz calls
                quizEnded = true;
            }
        }
    }, 1000);
};

const quizQuestions = () => {
    // Generate buttons for the answers first
    generateBtns();

    // questionEl takes the textContent from questionNumber and displays the current question from the array
    questionEl.textContent = testQuestionsArr[questionNumber].question
};

const generateBtns = () => {
    potentialAnswersEl.innerHTML = "";
    const answersObj = testQuestionsArr[questionNumber].answers;
    
    // Initialize an empty string to store the HTML 
    let answerBtnsHTML = "";

    // Build the HTML string for answer buttons within a for loop
    for (let i = 0; i < answersObj.length; i++) {
        answerBtnsHTML += `<button class="potentialAnswer">${answersObj[i]}</button>`;
    }

    // Append the entire HTML string to the potentialAnswersEl at once
    potentialAnswersEl.innerHTML = answerBtnsHTML;
    
    // Add event listeners to the newly created answer buttons
    const answerBtns = potentialAnswersEl.querySelectorAll(".potentialAnswer");

    answerBtns.forEach((btn) => {
        btn.addEventListener("click", function(event) {
            answer = testQuestionsArr[questionNumber].correctAnswer;
            iterateQuestion();
        });
    }); 
};

// connected to the answer buttons generated in the above code
const iterateQuestion = () => {
    // Clear any existing timeout
    clearTimeout(progressTimeout);

    // when the button is clicked this furthers users progress
    if (answer === event.target.textContent) {
        // Let user know answer is correct
        progressEl.textContent = "Correct Answer!"
        showProgress();
    }
    else { 
        // Let user know answer is incorrect
        progressEl.textContent = "Incorrect Answer!";;
        timeLeft = timeLeft - 10;
        showProgress();
    }

    // Continue to the next question 
    questionNumber++;

    // Check if there are more questions in the array 
    if (questionNumber < testQuestionsArr.length) {
        // Display the next question and generate buttons for the answers
        quizQuestions();
    }

    // Set a new timeout for hiding the progress message
    progressTimeout = setTimeout(hideProgress, 3000);
};

// showProgress displays notification whether answer is right or wrong
const showProgress = () => progressEl.removeAttribute("style");

// hideProgress removes the notification after a set amount of time
const hideProgress = () => progressEl.style.display="none";

// show user score after the quiz is complete. Present user option to go back to main page or log current score.
const endQuiz = () => {
    // Clear the interval
    clearInterval(timer);

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

        backBtn.addEventListener("click", () => location.reload());

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
        mainPageBtn.addEventListener("click", () => location.reload());

        // high-score entry page 
        let enterScoreBtn = document.createElement('button');
        enterScoreBtn.classList.add('btn');
        enterScoreBtn.textContent = "Enter My Score"
        scoreEl.appendChild(enterScoreBtn);

        // call ScoreRegistration to bring up the entry page
        enterScoreBtn.addEventListener("click", () => scoreRegistration());
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
    saveButtonEl.addEventListener('click', (event) => {
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
        returnBtn.classList.add('btn', 'returnBtn');
        returnBtn.textContent = "Return";
        savedScore.appendChild(returnBtn);

        returnBtn.addEventListener("click", () => location.reload());
    });

    // lets try to return users back to main page
    let returnBtn = document.createElement('button');
    returnBtn.classList.add('btn', 'returnBtn');
    returnBtn.textContent = "Return";
    enterScore.appendChild(returnBtn);
 
    // reloads the entire page, resetting the time and the question in the process
    returnBtn.addEventListener("click", () => location.reload());
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