var token1;
var token2;
var lessen;

$("home.html").ready(function(){
    $("#btn1").click(function(){
        
        var endpoint = "https://emmauscollege.zportal.nl/api/v2/"
        var code = $("#inp1").val();
        code = code.replace(/\s+/g, '');

        $.ajax({
            url: (endpoint +"oauth/token"),
            type: 'POST',
            data: {grant_type: 'authorization_code', code},
            success: function(result) {
                $("#login").hide();
                $(".rooster").css("display", "block");
                token1 = result.access_token;
                $.ajax({
                    dataType: "json",
                    url: (endpoint + "appointments?user=112619"+"&access_token="+token1+"&start="+getStartTijd()+"&end="+getEndTijd()),
                    success: function(result) {
                        lessen = result;
                    }
                });
            },
            error: function() {
                alert("Probeer het opnieuw.");
            }
        }); 
    });
});

var datum = new Date().getDate();
var dag = new Date().getDay();
var tijd = Math.floor(new Date().getTime()/1000.0);
var d = new Date();
var startDag = (tijd - d.getHours() * 3600 - d.getMinutes() * 60 - d.getSeconds());

function getStartTijd() {
    var startTijd = startDag;
    if (dag != 1) {
        while (dag >= 2) {
            startTijd -= 86400; 
            dag -= 1;
        }
    }
    return startTijd + 604800
}
function getEndTijd() {
    var endTijd = startDag;
    if (dag != 0) {
        while (dag >= 1) {
            dag += 1;
            endTijd += 86400; 
            if (dag == 7) {
                dag = 0;
                endTijd += 86400; 
                break;
            }
        }
    }
    return endTijd + 604800
}