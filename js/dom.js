const defaultSessionSize = 50;

// Jquery elements
var numberOfProblemsInput = $("#number-of-problems-input");
var skipCompletedProblemsInput = $("#skip-completed-problems-input");
var imageContainer = $("#image-container");
var alternativesContainer = $("#alternatives-container");
var infoContainer = $("#info-container");
var answerViewer = $("#answer-viewer");
var sessionSettingsElement = $("#session-settings");
var problemViewer = $("#problem-viewer");
var alternativeButtons = [];

function updateNumberOfProblemsInput(){
    var skipCompletedProblems = skipCompletedProblemsInput.is(":checked");
    var max = skipCompletedProblems ? getNumberOfUnfinishedProblems() : problems.length;
    numberOfProblemsInput.val(Math.min(defaultSessionSize, max));
    numberOfProblemsInput.attr("max", max);
}

updateNumberOfProblemsInput();

skipCompletedProblemsInput.change(function(){
    updateNumberOfProblemsInput();
});

var session;

$("#session-settings-form").submit(function( event ) {
    event.preventDefault();

    hideSessionSettings();
    showProblemViewer();

    console.log(skipCompletedProblemsInput.is(":checked"));

    session = new PracticeSession(numberOfProblemsInput.val(), skipCompletedProblemsInput.is(":checked"));
    displayProblem(session.getCurrentProblem());
});

function hideSessionSettings(){
    sessionSettingsElement.css("display", "none");
}

function showProblemViewer(){
    problemViewer.css("display", "block");
}

function hideAnswerViewer(){
    answerViewer.css("display", "none");
}

function displayProblem(problem){
    imageContainer.empty();
    alternativesContainer.empty();
    infoContainer.empty();
    alternativeButtons = [];

    // Display image
    var image = $("<img>").attr("src", imageFolderPath + problem.problemFileName);
    imageContainer.append(image);

    // Display alternatives
    for(var i = 0; i < problem.numberOfAlternatives; i++){
        var alternativeButton = $("<button></button>");
        alternativeButton.attr("class", "btn btn-primary btn-lg medium-margins");
        alternativeButton.text(alternatives[i]);
        alternativeButton.data("alternative", i);
        alternativeButton.click(function(){
            var thisButton = $(this);

            var isCorrectAnswer = session.submitAnswer(thisButton.data("alternative"));

            if(!isCorrectAnswer){
                alternativeButtons[thisButton.data("alternative")].addClass("wrong-answer-button");
            }
            alternativeButtons[problem.answer].addClass("correct-answer-button");
            for (var i = 0; i < alternativeButtons.length; i++){
                alternativeButtons[i].addClass("no-interact");
            }

            displayAnswer(problem);
        });
        alternativesContainer.append(alternativeButton);
        alternativeButtons.push(alternativeButton);
    }
}

function displayAnswer(problem){
    answerViewer.css("display", "block");
    answerViewer.empty();

    var image = $("<img>").attr("src", imageFolderPath + problem.answerFileName);
    answerViewer.append(image);

    answerViewer.append($("<br>"));

    var button = $("<button></button>");
    button.attr("class", "btn btn-primary btn-lg medium-margins");
    if(session.isFinished()){
        button.text("All done :)");
        button.addClass("disabled");
    } else {
        button.text("Neste oppgave");
    }

    button.click(function(){
        hideAnswerViewer();
        displayProblem(session.getCurrentProblem());
    });

    answerViewer.append(button);
}
