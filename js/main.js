function practiceSession(numberOfProblems){
    this.score = 0;
    this.problems = getRandomProblems(numberOfProblems);
}

/*
 Maybe rewrite this to let us specify category later
 And exclude previously done problems
*/
function getRandomProblems(numberOfProblems){
    return getRandomElementsFromArray(problems, numberOfProblems);
}

function getRandomElementsFromArray(array, numberOfElements) {
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
