/**
 * Created by adityamangipudi1 on 4/27/15.
 */
document.addEventListener('DOMContentLoaded', function () {


    var input =document.querySelector('input[type="text"]')
    input.addEventListener('change',function(){
        console.log(input.value)
        makeAjaxCall('/requesturl?url='+encodeURI(input.value), 'GET', function(xhr){
            if(xhr.readyState ===4){
                var response = JSON.parse(xhr.responseText)
                console.log(response)
            }
        })


    })




    function makeAjaxCall(url, httpVerb, callback, data){

        var xhr = new XMLHttpRequest();
        xhr.open(httpVerb, url);
        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState === 4) {
                callback(xhr);
            }
        });

        (typeof data === 'undefined')? xhr.send(): xhr.send(data);


    }

});
