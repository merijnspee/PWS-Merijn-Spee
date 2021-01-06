var token1;
var naam1;
var token2;
var naam2;
var endpoint = "https://emmauscollege.zportal.nl/api/v2/";
var code1;
var code2;

var datum;
var dag;
var tijd;
var d = new Date();
var startDag;

var lessen1;
var lessen2;

var compleet = 0;

$("home.html").ready(function(){
    $("#btn1").click(function(){
        naam1 = $("#inp1").val();
        naam2 = $("#inp3").val();

        
        code1 = $("#inp2").val();
        code1 = code1.replace(/\s+/g, '');
        code2 = $("#inp4").val();
        code2 = code2.replace(/\s+/g, '');
        
        $.ajax({
            url: (endpoint +"oauth/token"),
            type: 'POST',
            data: {grant_type: 'authorization_code', code: code1},
            success: function(result) {
                token1 = result.access_token;
                compleet += 1;
                if (compleet == 1) {
                    document.cookie = "naam1=" + naam1;
                    $(location).attr('href', 'rooster.html');
                    $.ajax({
                        dataType: "json",
                        url: (endpoint + "appointments?user="+naam2+"&access_token="+token2+"&start="+getStartTijd()+"&end="+getEndTijd()),
                        success: function(result) {
                            lessen2 = result;
                        }
                    });
                }
            }
        });
    });
});

function getToken() {
    if (compleet == 0) {
        $.ajax({
            url: (endpoint +"oauth/token"),
            type: 'POST',
            data: {grant_type: 'authorization_code', code: code1},
            success: function(result) {
                compleet += 1;
                return (result.access_token);
            }
        });
    }
    if (compleet == 1) {
        $.ajax({
            url: (endpoint +"oauth/token"),
            type: 'POST',
            data: {grant_type: 'authorization_code', code: cod2},
            success: function(result) {
                return (result.access_token);
            }
        });
    }
}



function updateTijd() {
    datum = new Date().getDate();
    dag = new Date().getDay();
    tijd = Math.floor(new Date().getTime()/1000.0);
    startDag = (tijd - d.getHours() * 3600 - d.getMinutes() * 60 - d.getSeconds());
}
function getStartTijd() {
    updateTijd();
    var startTijd = startDag;
    if (dag != 1) {
        while (dag >= 2) {
            startTijd -= 86400; 
            dag -= 1;
        }
    }
    return startTijd;
}
function getEndTijd() {
    updateTijd();
    var endTijd = startDag;
    if (dag != 0) {
        while (dag >= 1) {
            dag += 1;
            endTijd += 86400; 
            if (dag == 7) {
                dag = 0;
                endTijd += 86400;
            }
        }
    }
    return endTijd;
}