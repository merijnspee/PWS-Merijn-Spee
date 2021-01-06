
$("rooster.html").ready(function(){
    var token1 = getToken();
    var token2 = getToken();
    alert(token1);
    $.ajax({
        dataType: "json",
        url: (endpoint + "appointments?user="+naam1+"&access_token="+token1+"&start="+getStartTijd()+"&end="+getEndTijd()),
        success: function(result) {
            lessen(result);
            
        }
    });
    alert("load");
    
});

function lessen() {
    var e = result.response.data;
    for (i in e) {
        if (e[i].valid == true) {
            console.log(e[i].startTimeSlot);
            var startTijd = new Date(e[i].start * 1000);
            var endTijd = new Date(e[1].end * 1000);
            var vandaag = (startTijd.getDay())
            startTijd = startTijd.getHours() + startTijd.getMinutes();
            endTijd = endTijd.getHours() + endTijd.getMinutes();
            var dagen = ["zo", "m", "d", "w", "do", "v", "z"]
            var lesDag = dagen[vandaag];
            var uur = e[i].startTimeSlot;   
            var vak = e[i].subjects[1];
            var docent = e[i].teachers[1];
            var locatie = e[i].locations[1];
            var lesId = lesDag + uur;
            lesId = "#" + lesId
            $(lesId).prepend(vak + '%0D%0A' + docent + '%0D%0A' + locatie + '%0D%0A' + startTijd + "-" + endTijd);
        }
    }
}