//

function Point(x, y){
    this.x = x;
    this.y = y;
}

var size = {
  width: window.innerWidth -30,
  height: window.innerHeight-30
}

window.onload = function(){
        (function () {
            var lastTime = 0;
            var vendors = ['ms', 'moz', 'webkit', 'o'];
            for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
                window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
            }

            if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                },
                timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

            if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
        }());

        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = size.width;
        canvas.height = size.height;
        ctx.lineCap = "round";

        // variable to hold how many frames have elapsed in the animation
        var t = 1;



        // set some style
        ctx.lineWidth = 1;
        ctx.strokeStyle = "white";
        // calculate incremental points along the path
        var points = calcWaypoints();
        // extend the line from start to finish with animation
        animate(points);


        // calc waypoints traveling along vertices
        function calcWaypoints() {
            var count = 100;
            var points = generatePoints(count);
            var waypoints = [];
            waypoints.push(points[0]);
            for (var i = 1; i < count; i++) {
                waypoints.push(points[i]);
                // var pt0 = points[i-1];
                // var pt1 = points[i];
                // var dx = pt1.x - pt0.x;
                // var dy = pt1.y - pt0.y;
                // for (var j = 0; j < 100; j++) {
                //     var x = pt0.x + dx * j / 100;
                //     var y = pt0.y + dy * j / 100;
                //     waypoints.push({
                //         x: x,
                //         y: y
                //     });
                // }
            }
            return (waypoints);
        }

        function sleep(ms) {
          return new Promise((resolve) => setTimeout(resolve, ms));
        }

        function animate() {
            sleep(50).then(() => {
                if (t < points.length-1) {
                    requestAnimationFrame(animate);
                }

                if(t >= 2 /*&& t%100 ==1*/){
                        fillTriangle(points[t-2], points[t-1], points[t]);
                }

                // draw a line segment from the last waypoint
                // to the current waypoint
                ctx.beginPath();
                ctx.moveTo(points[t - 1].x, points[t - 1].y);
                ctx.lineTo(points[t].x, points[t].y);
                ctx.stroke();
                // increment "t" to get the next waypoint
                t++;
            });


        }
}

function generatePoints(count){
    var points = [];
    points.push({x:0, y: size.height/2});
    var closest;
    var lastX = 0;
    var lastY = size.height/2;
    var lastUnitVec = new Point(1, 0);
    var lastPoint = points[0];
    for(var i = 1; i < count; i++){
        if(lastPoint.x <=30){
            lastUnitVec.x = 1;
        }
        else if (lastPoint.x >= size.width -30) {
            lastUnitVec.x = -1;
        }
        if(lastPoint.y <=30){
            lastUnitVec.y = 1;
        }
        if(lastPoint.y >= size.height-30){
            lastUnitVec.y = -1;
        }
        var angle = randInt(-120, 120);
        var unitVec = new Point(Math.cos(angle), Math.sin(angle));
        unitVec.x = lastUnitVec.x - unitVec.x;
        unitVec.y = lastUnitVec.y - unitVec.y;
        var dist = randInt(50, 200);
        var point = new Point(lastPoint.x + dist * unitVec.x, lastPoint.y + dist * unitVec.y);
        if(point.x < 0) point.x = 0;
        if(point.y < 0) point.y = 0;
        if(point.x > size.width) point.x = size.width;
        if(point.y > size.height) point.y = size.height;
        points.push(point);
        lastUnitVec = unitVec;
        lastPoint = point;
    }

   for(var i = 1; i < points.length-1; i++){
       var last = points[i-1];
       var min = Number.MAX_SAFE_INTEGER;
       var next;
       for(var j = i+1; j < points.length; j++){
           //var dFirst = distSquared(first, points[j]);
           var dist = distSquared(last, points[j]);
           if(dist < min){
               min = dist;
               next = j;
           }
       }
       var swap = points[i];
       points[i] = points[next];
       points[next] = swap;

   }
    return points;
}

function distSquared(point1, point2){
    var dx = (point1.x - point2.x);
    var dy = (point1.y - point2.y);
    return dx * dx + dy * dy;
}

function getRandomColor(){
        var letters = '0123456789ABCDEF';
        var color = '#';
        for(var i = 0; i < 6; i++){
                color += letters[randInt(0, 16)];
        }
        return color;
}

function randInt(min, max){
        return Math.floor(Math.random() * (max-min) + min);
}

function fillTriangle(point1, point2, point3){
        var c2 = canvas.getContext('2d');
c2.fillStyle = getRandomColor();
c2.beginPath();
c2.moveTo(point1.x, point1.y);
c2.lineTo(point2.x, point2.y);
c2.lineTo(point3.x, point3.y);
c2.closePath();
c2.fill();
}
