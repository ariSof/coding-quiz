var timeEl = document.querySelector("#timer"); //timer
var startButton = document.querySelector("#startBtn");
var quizSpace = document.querySelector("#quiz");
var timeLeft = 50;

var question1 = "Commonly used data types DO Not Include:";
var answers1 = ["strings", "booleans", "alerts", "numbers"];
var q1ans = 2;
var question2 = "The condition in an if / else statement is enclosed with _________.";
var answers2 = ["quotes", "curly brackets", "parenthesis", "square brackets"];
var q2ans = 1;
var question3 = "Arrays in JavaScript can be used to store ________.";
var answers3 = ["numbers and strings", "other arrays", "booleans", "all of the above"];
var q3ans = 3;
var question4 = "String values must be enclosed within ______ when being assigned to variables.";
var answers4 = ["commas", "curly brackets", "quotes", "parenthesis"];
var q4ans = 2;
var question5 = "A very useful tool used during development and debugging for printing content to the debugger is:";
var answers5 = ["JavaScript", "terminal/bash", "for loops", "console.log"];
var q5ans = 3;
var currentQuestion = 0;
var isQuizzOver = false;
//var addLine = document.createElement("hr");
var isRight = document.querySelector("#is-right");

//initialize tags for questions and list of answers
var answersList = document.createElement("ol");

//Initialize quiz is over initials input
var overText = document.createElement("h1");
var showScore = document.createElement("p");
var initialsLabel = document.createElement('label');
var initialsInput = document.createElement('input');
var saveButton = document.createElement('button');
var score = 100;

//Initialize high scores view
var highScoreTxt = document.createElement("h1");
var listOfScores = document.createElement("ol");
var startOverBtn = document.createElement("button");
var clearScoresBtn = document.createElement("button");

//Initialize local storage variables
var highScores = [];

//Show all done page with final score (aka time left)
//Ask for initials
function quizIsOver() {    
    isQuizzOver = true;
    score = timeLeft;
    timeEl.textContent = '';
    overText.textContent = "All done!";
    showScore.textContent = "Your final score is: " + score;    
    initialsLabel.textContent = "Enter your initials:";
    initialsInput.setAttribute("id", "initials");
    saveButton.textContent = "Save";

    quizSpace.textContent = '';
    quizSpace.appendChild(overText);
    quizSpace.appendChild(showScore);
    quizSpace.appendChild(initialsLabel);
    quizSpace.appendChild(initialsInput);
    quizSpace.appendChild(saveButton);
}

function renderHighScores(){

    quizSpace.textContent = '';
    isRight.textContent = '';
    highScoreTxt.textContent = "High Scores";
    quizSpace.appendChild(highScoreTxt);

    var scoreListItem = document.createElement('li');
    
    for(var i=0; i<highScores.length-1; i=i+2) {
        scoreListItem.textContent = highScores[i] + "-" + highScores[i+1];

        listOfScores.appendChild(scoreListItem);
        quizSpace.appendChild(listOfScores);
    }

    //Render buttons
    startOverBtn.textContent = "Start Over";
    clearScoresBtn.textContent = "Clear Scores"
    quizSpace.appendChild(startOverBtn);
    quizSpace.appendChild(clearScoresBtn);
}

startOverBtn.addEventListener("click", function(event){
    isQuizzOver = false;
    timeLeft = 50;
    firstQuestion();
});

clearScoresBtn.addEventListener("click", function(event){
    highScores = [];
    localStorage.setItem("highScores", JSON.stringify(highScores));

    listOfScores.textContent = "";

    renderHighScores();
});

//listener for Save initials button
saveButton.addEventListener("click", function(event){
//     //save initials to local storage and display High Scores
    var initialsText = initialsInput.value.trim();
    highScores.push(initialsText);
    highScores.push(score);
    initialsInput.value = "";
    localStorage.setItem("highScores", JSON.stringify(highScores));
    
    renderHighScores();
 });

//Starts the timer and decreases every second
function startTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      timeLeft--;
      if(!isQuizzOver) {
        timeEl.textContent = "Time: " + timeLeft;
      }
  
      if(timeLeft <= 0 || isQuizzOver) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        quizIsOver();
      }
      document.body.insertBefore(timeEl, quizSpace);
  
    }, 1000);
}

// The next three functions return the local variables that correspond
// to each question, its answer and answer options 
function getNextQuestion()  {
    var displayQuestion = currentQuestion;

    if(displayQuestion == 2){
        return question2;
    } else if (displayQuestion == 3) {
        return question3;
    } else if (displayQuestion == 4) {
        return question4;
    } else if (displayQuestion == 5) {
        return question5;
    } else {
        quizIsOver();
    }
}

function getAnswer() {
    if(currentQuestion == 2){
        return q2ans;
    } else if(currentQuestion == 3){
        return q3ans;
    } else if(currentQuestion == 4){
        return q4ans;
    } else if(currentQuestion == 5){
        return q5ans;
    }
}

function getAnswersArray() {
    if(currentQuestion == 2) {
        return answers2;
    } else if(currentQuestion == 3) {
        return answers3;
    } else if(currentQuestion == 4) {
        return answers4;
    } else if(currentQuestion == 5) {
        return answers5;
    }
}

//Shows next question of the quiz
function showNextQuestion(){
    if(timeLeft>0){
        currentQuestion = currentQuestion + 1;

        if (currentQuestion < 6) {
            var questionTag = document.createElement("h1");

            questionTag.textContent = getNextQuestion();

            quizSpace.textContent = '';
            quizSpace.appendChild(questionTag);

            answersList.textContent = '';
            answersList.setAttribute("id", "answerList");
            var theCorrectAnswer = getAnswer();
            var answersArray = getAnswersArray();

            for (var i = 0; i < 4; i++) {
                var listItem = document.createElement('li');
                listItem.setAttribute("id", i);

                if (i === theCorrectAnswer) {
                    listItem.setAttribute("is-answer", true);
                } else {
                    listItem.setAttribute("is-answer", false);
                }

                listItem.textContent = answersArray[i];
                answersList.appendChild(listItem);
                quizSpace.appendChild(answersList);
            }
        } else {
            quizIsOver();
        }
    }
}

function firstQuestion(){
    startTime();
    currentQuestion = 1;

    var questionTag = document.createElement("h1");
    questionTag.textContent = question1;

    quizSpace.textContent = '';
    quizSpace.appendChild(questionTag);
    
    answersList.textContent = '';
    answersList.setAttribute("id", "answerList");

    for(var i=0; i<4; i++){
        var listItem = document.createElement('li');
        listItem.setAttribute("id", i);

        if(i === q1ans){
            listItem.setAttribute("is-answer", true);
        } else {
            listItem.setAttribute("is-answer", false);
        }

        listItem.textContent = answers1[i];
        answersList.appendChild(listItem);
        quizSpace.appendChild(answersList);
    }
}

//Start Quiz button listener, for when quiz page first loads
//Shows the first question and starts the Timer
startButton.addEventListener("click", function(event){
    event.preventDefault();

    firstQuestion();
});

//Listener for quiz answer selected (added to Order List parent)
answersList.addEventListener("click", function(event) {
    event.preventDefault();
    var element = event.target;
  
    if(element.matches("li")){
      var isAnswer = element.getAttribute("is-answer");
     
      if(isAnswer === "true"){
        //Display Correct, Call next question
        isRight.textContent = "Correct!";

        if(timeLeft > 0) {
            showNextQuestion();
        } else {
            quizIsOver();
        }
      }
      else {
        isRight.textContent = "Incorrect...";
        //Take 10sec away from time, display Incorrect
        if(timeLeft !== 0 && timeLeft > 10) {
            timeLeft = timeLeft - 10;
        } else {
            quizIsOver();
        }
      }
    }
  });