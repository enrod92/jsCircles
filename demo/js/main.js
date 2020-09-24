//using immediate function to avoid global variable issues
( function(){

    var mousedown_time;

    function getTime(){
        var date = new Date();
        return date.getTime();
    }

    document.onmousedown = function(e){
        mousedown_time = getTime();
    }
    document.onmouseup = function(e){
        time_pressed = getTime() - mousedown_time;
        console.log('You held your mouse down for', time_pressed, 'miliseconds.');
    }

    //technically we don't even need the mousedown variable but we're leaving it there for now..

})();