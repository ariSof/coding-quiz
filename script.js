var startButton = document.querySelector("#startBtn");
var quizSpace = document.querySelector("#quiz");

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

var timeEl = document.createElement("div");
var timeLeft =30;
var answersList = document.createElement("ol");

function quizIsOver() {
    //Show all done page with final score (aka time left)
    //Ask for initials
}

//Starts the timer and decreases every second
function startTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      timeLeft--;
      timeEl.textContent = "Time: " + timeLeft;
  
      if(timeLeft <= 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        quizIsOver();
      }
      document.body.insertBefore(timeEl, quizSpace);
  
    }, 1000);
}

//Shows question 2 of the quiz
function showQuestion2(){
    if(timeLeft>0){
        var questionTag = document.createElement("h1");
        questionTag.textContent = question2;
    
        quizSpace.textContent = '';
        quizSpace.appendChild(questionTag);
        
        answersList.textContent = '';
        answersList.setAttribute("id", "answerList");
    
        for(var i=0; i<4; i++){
            var listItem = document.createElement('li');
            listItem.setAttribute("id", i);
    
            if(i === q2ans){
                listItem.setAttribute("is-answer", true);
            } else {
                listItem.setAttribute("is-answer", false);
            }
    
            listItem.textContent = answers2[i];
            answersList.appendChild(listItem);
            quizSpace.appendChild(answersList);
        }
    }
}

//Start Quiz button listener, for when quiz page first loads
startButton.addEventListener("click", function(event){
    event.preventDefault();

    startTime();

    var questionTag = document.createElement("h1");
    questionTag.textContent = question1;

    quizSpace.textContent = '';
    quizSpace.appendChild(questionTag);
    
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
});

//Listener for quiz answers added to Order List parent
answersList.addEventListener("click", function(event) {
    event.preventDefault();
    var element = event.target;
  
    if(element.matches("li")){
      var isAnswer = element.getAttribute("is-answer");
      console.log("answer is?=" + isAnswer);
  
      if(isAnswer === "true"){
        //Display Correct, Call next question
        console.log("Correct!");

        if(timeLeft > 0) {
            showQuestion2();
        } else {
            quizIsOver();
        }
      }
      else {
        //Take 10sec away from time, display Incorrect
        if(timeLeft !== 0) {
            timeLeft = timeLeft - 10;
        }
        console.log("Incorrect...");
      }
    }
  });