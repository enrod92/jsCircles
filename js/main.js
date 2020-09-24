// Added the redius parameter to create circles of different sizes based on the time the mouse was pressed
function Circle(cx, cy, r, html_id)
{
    var html_id = html_id;
    // Added the radius passed as an argument during the circle creation
    this.info = { cx: cx,  cy: cy, r: r };

    //private function that generates a random number
    var randomNumberBetween = function(min, max){
        return Math.random()*(max-min) + min;
    }

    this.initialize = function(){
        //give a random velocity for the circle
        this.info.velocity = {
            x: randomNumberBetween(-3,3),
            y: randomNumberBetween(-3,3)
        }

        //create a circle
        var circle = makeSVG('circle',
            { 	cx: this.info.cx,
                cy: this.info.cy,
                r:  this.info.r, // redius is now dynamically added
                id: html_id,
                style: "fill: black"
            });

        document.getElementById('svg').appendChild(circle);
    }

    this.update = function(time){
        var el = document.getElementById(html_id);

        //see if the circle is going outside the browser. if it is, reverse the velocity.
        // Adjusted the calculations to take into account the radius of the circles so the bounce works properly extracting the r property from the object.
        if( this.info.cx > document.body.clientWidth - this.info.r || this.info.cx - this.info.r < 0)
        {
            this.info.velocity.x = this.info.velocity.x * -1;
        }
        if( this.info.cy > document.body.clientHeight - this.info.r || this.info.cy - this.info.r < 0)
        {
            this.info.velocity.y = this.info.velocity.y * -1;
        }

        this.info.cx = this.info.cx + this.info.velocity.x*time;
        this.info.cy = this.info.cy + this.info.velocity.y*time;

        el.setAttribute("cx", this.info.cx);
        el.setAttribute("cy", this.info.cy);
    }

    //creates the SVG element and returns it
    var makeSVG = function(tag, attrs) {
        var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
        for (var k in attrs)
        {
            el.setAttribute(k, attrs[k]);
        }
        return el;
    }

    this.initialize();
}

function PlayGround()
{
    var counter = 0;  //counts the number of circles created
    var circles = [ ]; //array that will hold all the circles created in the app

    //a loop that updates the circle's position on the screen
    this.loop = function(){
        for(circle in circles)
        {
            circles[circle].update(1);
            // console.log(circles[circle].info.cx);
        }

        for(circle in circles)
        {
            x1 = circles[circle].info.cx;
            y1 = circles[circle].info.cy;
            // console.log(circle);

            for (var i = circle * 1 + 1; i < circles.length; i++) {

                x2 = circles[i].info.cx;
                y2 = circles[i].info.cy;

                if ( (circles[circle].info.r + circles[i].info.r) > Math.sqrt(Math.pow((x1 - x2),2)+Math.pow((y1 - y2),2)) ) {

                    vx1 = circles[circle].info.velocity.x;
                    vy1 = circles[circle].info.velocity.y;
                    vx2 = circles[i].info.velocity.x;
                    vy2 = circles[i].info.velocity.y;
                    m1 = circles[circle].info.r*1;
                    m2 = circles[i].info.r*1;

                    newVelX1 = (vx1 * (m1 - m2) + (2 * m2 * vx2)) / (m1 + m2);
                    newVelY1 = (vy1 * (m1 - m2) + (2 * m2 * vy2)) / (m1 + m2);
                    newVelX2 = (vx2 * (m2 - m1) + (2 * m1 * vx1)) / (m1 + m2);
                    newVelY2 = (vy2 * (m2 - m1) + (2 * m1 * vy1)) / (m1 + m2);

                    circles[circle].info.velocity.x = newVelX1;
                    circles[circle].info.velocity.y = newVelY1;
                    circles[i].info.velocity.x = newVelX2;
                    circles[i].info.velocity.y = newVelY2;
                }
            }
        }
    }

    // Added the redius parameter to create circles of different sizes based on the time the mouse was pressed
    this.createNewCircle = function(x,y,r){
        var new_circle = new Circle(x,y,r,counter++);
        circles.push(new_circle);
        // console.log('created a new circle!', new_circle);
    }

    //create one circle when the game starts
    // Added the redius parameter to create circles of different sizes based on the time the mouse was pressed
    this.createNewCircle(document.body.clientWidth/2, document.body.clientHeight/2,10);
}

var mousedown_time;
var playground = new PlayGround();


function getTime(){
    var date = new Date();
    return date.getTime();
}

document.onmousedown = function(e){
    mousedown_time = getTime();
}

document.onmouseup = function(e) {
    // Calculate the time the mouse was pressed
    time_pressed = getTime() - mousedown_time;

    // Selecting the radius depending on the time the mouse was pressed
    if (time_pressed<100) {
        radius = 10;
    }
    else if (time_pressed<150) {
        radius = 15;
    }
    else if (time_pressed<200) {
        radius = 20;
    }
    else if (time_pressed<250) {
        radius = 25;
    }
    else if (time_pressed<300) {
        radius = 30;
    }
    else if (time_pressed<350) {
        radius = 35;
    }
    else if (time_pressed<400) {
        radius = 40;
    }
    else if (time_pressed<450) {
        radius = 45;
    }
    else {
        radius = 50;
    }

    // Added the redius parameter to create circles of different sizes based on the time the mouse was pressed
    playground.createNewCircle(e.x,e.y,radius);
}
setInterval(playground.loop, 15);
