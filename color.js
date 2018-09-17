class Color{

    constructor(){
        this.r = randInt(100, 255);
        this.g = randInt(100, 255);
        this.b = randInt(100, 255);
    }

    adjustRed(val){
        this.r +=val;
        if(this.r > 255){
            this.r = 255;
            this.adjustBlue(this.r % 255);
        }
        else if(this.r < 64){
            this.r = 0;
            this.adjustBlue(Math.abs(this.r));
        }
    }

    adjustBlue(val){
        this.b +=val;
        if(this.b > 255){
            this.b = 255;
            this.adjustGreen(this.b % 255);
        }
        else if(this.b < 64){
            this.b = 0;
            this.adjustGreen(Math.abs(this.b));
        }
    }

    adjustGreen(val){
        this.g +=val;
        if(this.g > 255){
            this.g= 255;
            this.adjustRed(this.g % 255);
        }
        else if(this.g < 64){
            this.g = 0;
            this.adjustRed(Math.abs(this.g));
        }
    }


    ToString() {
      return "#" + this.r.toString(16) + this.g.toString(16) + this.b.toString(16);
    }




}
//
// var hexColors = [0x000001, 0x000100, 0x010000, -0x000001, -0x000100, -0x010000];
//
//
// function getRandomColor(){
//         var letters = '0123456789ABCDEF';
//         var color = '#';
//         for(var i = 0; i < 6; i++){
//                 color += letters[randInt(0, 16)];
//         }
//         return color;
// }
//
// function incrementColor(color){
//     var temp = "0x" + color.substring(1);
//     var val = parseInt(temp);
//     console.log(val);
//     if(val < targetColor){
//         val+= hexColors[randInt(0, 3)];
//     }
//     else if (val > targetColor){
//         val += hexColors[randInt(3,6)];
//     }
//     else{
//         targetColor = colorStringAsNumber(getRandomColor());
//     }
//     return "#" + val.toString(16);
// }
//
//
// function colorStringAsNumber(color){
//     var temp = "0x" + color.substring(1);
//     return parseInt(temp);
// }
