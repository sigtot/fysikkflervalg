var localStorage = window.localStorage;
if(!localStorage.getItem("numberOfCompletedProblems")){
    localStorage.setItem("numberOfCompletedProblems", 0);
}

function PracticeSession(numberOfProblems, skipCompletedProblems){
    this.score = 0;
    this.problems = getRandomProblems(numberOfProblems, skipCompletedProblems);
    this.currentProblemNumber = 0;
    this.skipCompletedProblems = skipCompletedProblems;
}

PracticeSession.prototype.getCurrentProblem = function(){
  return this.problems[this.currentProblemNumber];
};

PracticeSession.prototype.isFinished = function(){
    return this.currentProblemNumber === this.problems.length; // Should be one more than the last index
};

PracticeSession.prototype.submitAnswer = function(answer){
    if(this.isFinished()) {
        throw new Error("Can't submit answers to a finished practiceSession");
    }
    var correctAnswer = this.getCurrentProblem().answer === answer;
    if(correctAnswer){
        this.score++;
        localStorage.setItem(this.getCurrentProblem().problemFileName, "done");
        localStorage.setItem("numberOfCompletedProblems", localStorage)
    }else{
        localStorage.setItem(this.getCurrentProblem().problemFileName, "failed");
    }

    this.currentProblemNumber++;

    return correctAnswer;
};

function getRandomProblems(numberOfProblems, skipCompletedProblems){
    var numberOfAvailableProblems = problems.length;

    // Create array to put problems in
    var chosenProblems = [];

    // Create shuffled array of the ints from 0 to numberOfAvailableProblems
    var indexesToTry = [];
    for(var i = 0; i < numberOfAvailableProblems; i++){
        indexesToTry.push(i);
    }
    shuffleArray(indexesToTry);

    for(var i = 0; i < numberOfAvailableProblems && chosenProblems.length < numberOfProblems; i++){
        var problem = problems[indexesToTry[i]];
        var problemIsCompleted = localStorage.getItem(problem.problemFileName) === "done";
        if(!problemIsCompleted || !skipCompletedProblems) chosenProblems.push(problem);
    }

    return chosenProblems;
}

function getNumberOfUnfinishedProblems(){
    var numberOfUnfinishedProblems = 0;
    for(var i = 0; i < problems.length; i++){
        if(localStorage.getItem(problems[i].problemFileName) !== "done") numberOfUnfinishedProblems++;
    }
    return numberOfUnfinishedProblems;
}

function getRandomElementsFromArray(arr, n, skipCompletedProblems) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len;
    }
    return result;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
