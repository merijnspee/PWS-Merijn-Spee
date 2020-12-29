

$("home.html").ready(function(){
    $("#btn1").click(function(){
        var token1;
        var token2;
        var endpoint = "https://emmauscollege.zportal.nl/api/v2/"
        var code = $("#inp1").val();
        code = code.replace(/\s+/g, '');

        $.ajax({
            url: (endpoint +"oauth/token"),
            type: 'POST',
            data: {grant_type: 'authorization_code', code},
            success: function(result) {
                token1 = result.access_token;
                alert(token1);
                $.ajax({
                    url: ("https://emmauscollege.zportal.nl/api/v3/appointments?user=112619&start=1388998982&end=1389998982&access_token=" + token1),
                    success: function(result) {
                        alert (result);
                    }
                }) 

            }
        });

        /*code = $("#inp2").val();
        code = code.replace(/\s+/g, '');
        
        $.ajax({
            url:"https://emmauscollege.zportal.nl/api/v2/oauth/token",
            type: 'POST',
            data: {grant_type: 'authorization_code', code},
            success: function(result) {
                token1 = result.access_token;
                alert(token2);
            }
        });
        */
    });
});
