const defaultSessionSize = 50;

// Jquery elements
var numberOfProblemsInput = $("#number-of-problems-input");
var imageContainer = $("#image-container");
var alternativesContainer = $("#alternatives-container");
var infoContainer = $("#info-container");
var sessionSettingsElement = $("#session-settings");
var problemViewer = $("#problem-viewer");

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

function hideProblemViewer(){
    problemViewer.css("display", "none");
}

function displayProblem(problem){
    imageContainer.empty();
    alternativesContainer.empty();
    infoContainer.empty();

    var image = $("<img>").attr("src", imageFolderPath + problem.problemFileName);
    imageContainer.append(image);

    for(var i = 0; i < problem.numberOfAlternatives; i++){
        var alternativeButton = $("<button></button>");
        alternativeButton.attr("class", "btn btn-primary btn-lg medium-margins");
        alternativeButton.text(alternatives[i]);
        alternativeButton.data("alternative", i);
        alternativeButton.click(function(){
            var thisButton = $(this);
            var isCorrectAnswer = session.submitAnswer(thisButton.data("alternative"));
            if(isCorrectAnswer){
                thisButton.addClass("correct-answer-button");
            } else {
                thisButton.addClass("wrong-answer-button");
            }
        });
        alternativesContainer.append(alternativeButton);
    }
}

