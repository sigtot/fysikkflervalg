const defaultSessionSize = 50;

// Jquery elements
var numberOfProblemsInput = $("#number-of-problems-input");
var imageContainer = $("#image-container");
var alternativesContainer = $("#alternatives-container");
var infoContainer = $("#info-container");
var answerViewer = $("#answer-viewer");
var sessionSettingsElement = $("#session-settings");
var problemViewer = $("#problem-viewer");
var alternativeButtons = [];

numberOfProblemsInput.val(Math.min(defaultSessionSize,problems.length));
numberOfProblemsInput.attr("max", problems.length);

var session;

$("#session-settings-form").submit(function( event ) {
    event.preventDefault();

    hideSessionSettings();
    showProblemViewer();

    session = new PracticeSession(numberOfProblemsInput.val());
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

            // Answer needs to be submitted. We can use isCorrectAnswer to add crazy congratulatory effects later maybe
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
