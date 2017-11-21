const defaultSessionSize = 50;

var numberOfProblemsInput = $("#number-of-problems-input");
numberOfProblemsInput.val(Math.min(defaultSessionSize,problems.length));
numberOfProblemsInput.attr("max", problems.length);

var session;

$("#session-settings-form").submit(function( event ) {
    event.preventDefault();

    hideSessionSettings();
    showProblemViewer();

    session = new PracticeSession(numberOfProblemsInput.val());
});

function hideSessionSettings(){
    $("#session-settings").css("display", "none");
}

function showProblemViewer(){
    $("#problem-viewer").css("display", "block");
}

