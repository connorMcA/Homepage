/**
create a simple point object
*/
function Point(x, y){
    this.x = x;
    this.y = y;
}

/**
prepare the size of the window
*/
var size = {
  width: window.innerWidth -30,
  height: window.innerHeight-30
}

//various things used for various drawing functions
var xfact = 3;
var t = randInt(0, 3000);
var xThing = randInt(1,3);
var baseDiff = 1;
var baseOscillations = 80;
var baseRadius = 200;
var xBase = 2.5;
var transitionLength = 2500;
a = randInt(1, 10);
b = randInt(1, 10);
c = randInt(1, 10);
d = randInt(1, 10);
//nice values
// 7, 7, 8, 9
// 9, 9, 6, 8
// 8, 6, 6, 8
// 5, 4, 9, 6

aBase = a;
bBase = b;
cBase = c;
dBase = d;
aApproach = randInt(a-3, a+3);
bApproach = randInt(b-3, b+3);
cApproach = randInt(c-3, c+3);
dApproach = randInt(d-3, d+3);
approachLength = 4000;

//more variables
var diff = baseDiff;
var oscillations = baseOscillations;
var radius = baseRadius;
var points = [new Point(size.width/2, size.height/2)];

//1% of a circle
var incr = (2 * Math.PI)/360;


function update(){
    t++;
    points = innerCircles(new Point(size.width/2, 120+ size.height/2), size.width/4, size.height/3,  t);

    return points;
}

function figureOscillations(center, radius, diff, oscillations, shift){
    radius = baseRadius +  50 * Math.sin(t/13 * incr);
    diff = baseDiff - 30 * Math.sin(t/7 * incr);
    oscillations = baseOscillations + (3 * Math.sin(t/40 * incr));
    var points = [];
    for(var i = 0; i <360; i+=.2){
        var rad = i * incr;
        var temp = test(rad * oscillations) * (diff);
        var tempradius = ((radius) + temp);
        //var x =  tempradius * Math.cos(rad * xfact);
        //var y = tempradius * Math.sin(rad * 2);
        var x =  tempradius * Math.cos(rad * (xThing + Math.cos(t/2000)));
        var y = tempradius * Math.sin(rad * 2);
        var dx = x * Math.cos(shift) - y * Math.sin(shift);
        var dy = x * Math.sin(shift) + y * Math.cos(shift);
        points.push(new Point(center.x + dx, center.y + dy));
    }
    return points;
}

function innerCircles(center, radius, something, shift){
    radius = baseRadius +  30 * Math.sin(t/300 * incr);
    diff = baseDiff - 30 * Math.sin(t/150 * incr);

    oscillations = baseOscillations + (20 * Math.sin(t/40 * incr));
    var points = [];
    var cosShift = Math.cos(shift);
    var sinShift = Math.sin(shift);
    for(var i = 0; i <=360; i+=.1){
        var rad = i * incr;
        // var temp = func(rad * oscillations) * (diff);
        // var tempradius = ((radius) + temp);
        //var x =  tempradius * Math.cos(rad * xfact);
        //var y = tempradius * Math.sin(rad * 2);
        var x = (diff + radius) * Math.cos(rad) - oscillations * Math.cos((radius/diff + 1) * rad);
        var y = (diff + radius) * Math.sin(rad) - oscillations * Math.sin((radius/diff + 1) * rad);
        var dx = x * cosShift - y * sinShift;
        var dy = x * sinShift + y * cosShift;
        points.push(new Point(center.x + dx, center.y + dy));
    }
    return points;
}

function hypotrochoid(center, width, height, shift){
    if(shift % approachLength== 0 ){
        changeApproachVars();
    }

    var points = [];
    let temp = shift % approachLength;
    let other = approachLength;
    a = approach(aApproach, temp, aBase, other);
    b = approach(bApproach, temp, bBase, other);
    c = approach(cApproach, temp, cBase, other);
    d = approach(dApproach, temp, dBase, other);
    // var cosShift = Math.cos(shift);
    // var sinShift = Math.sin(shift);
    k = a/b;
    for (var i = 0; i < 360 * 10; i +=1){
        rad = i * incr;
        var x = Math.cos(rad * a) - Math.pow(Math.cos(rad * b), 3);
        var y = Math.sin(rad * c) - Math.pow(Math.sin(rad * d), 4);
        // var dx = x * cosShift - y * sinShift;
        // var dy = x * sinShift + y * cosShift;
        points.push(new Point(center.x + x * width, center.y + y * height));
    }
    return points;
}

/**
this is a random function that is used for figureOscillations
doesn't do random things its
*/
function test(angle){
    return 1 + (1 * Math.cos( angle));
}

/**

*/
function approach(to, step, from, length){
    let x = step/length;
    return (to-from)* (3 * x * x - 2 * x * x * x) + from;
}

function changeApproachVars(){
    aBase = a;
    bBase = b;
    cBase = c;
    dBase = d;
    aApproach = randInt(a-3, a+3);
    bApproach = randInt(b-3, b+3);
    cApproach = randInt(c-3, c+3);
    dApproach = randInt(d-3, d+3);
}

/**
randInt returns a random int in the range of min-max
int min: minimum number of random range
int max: maximum number of random range
*/
function randInt(min, max){
        return Math.floor(Math.random() * (max-min) + min);
}
