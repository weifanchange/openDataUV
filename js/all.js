$(document).ready(function(){
    var county=[];
    var result;

    $('.st-bar').click(function (e) { 
        e.preventDefault();
        $('body').toggleClass('open');
    });

    $.ajax({
        url: "https://opendata.epa.gov.tw/ws/Data/UV/?$format=json",
        jsonp: "callback",
        dataType: "jsonp",
        success: function( response ) {
            // console.log( response ); // server response
            // console.log(response[0]["AQI"]);
            var len = response.length;
            for(var i=0; i<len; i++)
            {
                $('#content').append("<li>"+response[i]["County"]+"  "+response[i]["SiteName"]+"<br>UVI:"+response[i]["UVI"]+"</li>");
                var ariUVI = parseInt(response[i]["UVI"]);
                if(ariUVI>=0 && ariUVI<=2) {$('#content').children().last().attr("style","background-color:#00e800");}
                else if(ariUVI>=3 && ariUVI<=5){$('#content').children().last().attr("style","background-color:#ff0");}
                else if(ariUVI>=6 && ariUVI<=7){$('#content').children().last().attr("style","background-color:#ff7e00");}
                else if(ariUVI>=8 && ariUVI<=10){$('#content').children().last().attr("style","background-color:red");}
                else if(ariUVI>=11 ){$('#content').children().last().attr("style","background-color:#8f3f97");}

                county[i]=response[i]["County"];
            }

            result = county.filter(function(element, index, arr){
                return arr.indexOf(element)===index;
            });

            result.forEach(function(e){
                $('#countyName').append('<option value="'+e+'">'+e+'</option>')
                // $('#countyName2').append('<li>'+e+'</li>')
                $('#countyName2').append('<li><a class="bar-item" href="#">'+e+'</a></li>')
            });

            $('#countyName').on('change',function(){
                _select();
            });
            $('#countyName2').click(function (e) {
                e.preventDefault();
                $('#countyName').val(e.target.text);
                $('body').toggleClass('open');
                _select();
            });

            function _select(){
                $('#content').html('');
                response.forEach(function(e){
                    if($('#countyName').val() == e.County){
                        $('#content').append("<li>"+e["County"]+"  "+e["SiteName"]+"<br>UVI:"+e["UVI"]+"</li>");
                        var ariUVI = parseInt(e["UVI"]);
                        if(ariUVI>=0 && ariUVI<=2) {$('#content').children().last().attr("style","background-color:#00e800");}
                        else if(ariUVI>=3 && ariUVI<=5){$('#content').children().last().attr("style","background-color:#ff0");}
                        else if(ariUVI>=6 && ariUVI<=7){$('#content').children().last().attr("style","background-color:#ff7e00");}
                        else if(ariUVI>=8 && ariUVI<=10){$('#content').children().last().attr("style","background-color:red");}
                        else if(ariUVI>=11){$('#content').children().last().attr("style","background-color:#8f3f97");}
                    }
                });
            }
        },
        error: function () {
            console.log('error');
        }
    });
});