const defaultSessionSize = 50;

var numberOfProblemsInput = $("#number-of-problems-input");
numberOfProblemsInput.val(Math.min(defaultSessionSize,problems.length));
numberOfProblemsInput.attr("max", problems.length);

$("#session-settings-form").submit(function( event ) {
    event.preventDefault();

    hideSessionSettings();
    showProblemViewer();
});

function hideSessionSettings(){
    $("#session-settings").css("display", "none");
}

function showProblemViewer(){
    $("#problem-viewer").css("display", "block");
}

