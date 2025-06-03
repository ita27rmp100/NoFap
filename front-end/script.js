// LogIn / SignIn page
// selection bar 
let moods = ['login','signup'] , display = ['none','block'] , indexMode = 0

function htmlForm(){
    $(".sign").css('display',display[indexMode])
    $(".log").css('display',display[1-indexMode])
}
function toogleMood(){
    indexMode = 1-indexMode
    htmlForm()
    // chosen
    $(`#${moods[1-indexMode]}`).addClass('btn-light')
    $(`#${moods[1-indexMode]}`).removeClass('btn-dark')
    // replaced one
    $(`#${moods[indexMode]}`).addClass('btn-dark')
    $(`#${moods[indexMode]}`).removeClass('btn-light')
    document.title = `NoFap | ${moods[indexMode].toUpperCase()}`
}
htmlForm()
// edit on navbar according to title
$(document).ready(
    function(){
        $("label").addClass("btn p-3 col-6")
    }
)