function PracticeSession(numberOfProblems){
    this.score = 0;
    this.problems = getRandomProblems(numberOfProblems);
    this.currentProblemNumber = 0;
}

PracticeSession.prototype.getCurrentProblem = function(){
  return this.problems[this.currentProblemNumber];
};

PracticeSession.prototype.submitAnswer = function(answer){
    var correctAnswer = this.getCurrentProblem().answer === answer;
    if(correctAnswer){
        this.score++;
    }
    this.currentProblemNumber++;
    return correctAnswer;
};

/*
 Maybe rewrite this to let us specify category later
 And exclude previously done problems
*/
function getRandomProblems(numberOfProblems){
    return getRandomElementsFromArray(problems, numberOfProblems);
}

function getRandomElementsFromArray(arr, n) {
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
