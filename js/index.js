var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;
var wronganswer;
var noofques = 0;
//if you click on the start/reset//
document.getElementById("startreset").onclick = function() {
        //if we are playing
        if (playing == true) {
            location.reload(); //reload the page
        } else {
            //if we are not playing
            playing = true; // change mode to playing
            score = 0; //set the score to 0
            document.getElementById("score-value").innerHTML = score;
            //change button to reset
            document.getElementById("startreset").innerHTML = "Reset Game";
            //show the countdouwn button
            show("timeremaining");
            timeremaining = 60;
            document.getElementById("timeremainingvalue").innerHTML = timeremaining;
            hide("gameover");

            //function calls
            startcountdown();
            generateQA();
            noofques++;
        }
    }
    //clicking on the answer box
for (var i = 1; i < 5; i++) {
    document.getElementById("box" + i).onclick =
        function() {
            //user playing then
            if (playing == true) {
                //if correct answer is given by the user
                if (this.innerHTML == correctAnswer) {
                    score++;
                    document.getElementById("score-value").innerHTML = score;
                    hide("wrong");
                    setTimeout(function() {
                        show("correct");
                    }, 1000);
                    generateQA();
                    noofques++;
                    //if user gives wrong answer
                } else {
                    hide("correct");
                    setTimeout(function() {
                        show("wrong");
                    }, 1000);
                }
            }
        }
}
//function startcountdown
function startcountdown() {
    action = setInterval(function() {
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if (timeremaining == 0) {
            stopcountdown();
            show("gameover");
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            document.getElementById("gameover").
            innerHTML =
                "<p>game over!</p><p>your score is:" + score + "</p><p>No Of Questions:" + noofques + "</p>";
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);
}
//stop countdown function
function stopcountdown() {
    clearInterval(action);
}
//hide the element 
function hide(ID) {
    document.getElementById(ID).style.display = "none";
}
//show the element
function show(ID) {
    document.getElementById(ID).style.display = "block";
}
//for generating new questions
function generateQA() {
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;
    console.log(correctAnswer);
    document.getElementById("question").innerHTML = x + "X" + y;
    var correctposition = 1 + Math.round(3 * Math.random()); //store correct answer at this position of box
    debugger;
    document.getElementById("box" + correctposition).innerHTML = correctAnswer;
    var answer = [correctAnswer];
    //store the wrong answer in othe 3 random boxes
    for (var i = 1; i < 5; i++) {
        if (i != correctposition) {
            do {
                wronganswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
            }
            while (answer.indexOf(wronganswer) > -1) {
                document.getElementById("box" + i).innerHTML = wronganswer;
                answer.push(wronganswer);
            }
        }
    }
}