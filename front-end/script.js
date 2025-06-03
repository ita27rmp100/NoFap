// LogIn / SignIn page
// selection bar 
let moods = ['login','signup'] , display = ['none','block'] , indexMode = 0

function htmlForm(){
    $(".sign").css('display',display[indexMode])
    $(".log").css('display',display[Math.abs(indexMode-1)])
}
function toogleMood(){
    // chosen
    $(`#${moods[Math.abs(indexMode)-1]}`).addClass('btn-light')
    $(`#${moods[Math.abs(indexMode)-1]}`).removeClass('btn-dark')
    // replaced one
    $(`#${moods[indexMode]}`).addClass('btn-dark')
    $(`#${moods[indexMode]}`).removeClass('btn-light')
    document.title = `NoFap | ${moods[indexMode].replace("i","I") || moods[indexMode].replace("u","U")}`
    indexMode = Math.abs(indexMode-1)
    htmlForm()
}
htmlForm()
// edit on navbar according to title
$(document).ready(
    function(){
        $("label").addClass("btn p-3 col-6")
    }
)