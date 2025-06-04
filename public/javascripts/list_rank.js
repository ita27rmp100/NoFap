$(document).ready(function(){
    let leaderboard = document.dataset.rank
    let userNum = Object.keys(leaderboard).length
    for (let i=0;i<userNum;i++) {
        $("#listUsers").append(`
            <tr>
                <td>${i+1}</td>
                <td>${Object.keys(leaderboard)[i]}</td>
                <td>${leaderboard[Object.keys(leaderboard)[i]].username}</td>
            </tr>      
        `)
    }
})