window.onload = function(){
        var children = document.getElementById('left').querySelectorAll("#left > li")
        var indent = 10;
        for(var i = 0; i < children.length; i++){
                children[i].style.paddingLeft = indent + "px";
                indent +=20;
        }
};

function changeRight(id){
        var rightDivs = document.getElementById('right').querySelectorAll("#right>div");

        for(var i = 0; i < rightDivs.length; i++){

                if(rightDivs[i].id == id){
                        rightDivs[i].className = "show";
                }
                else{
                        rightDivs[i].className = "hidden";
                }
        }
        console.log('here');
}


function go_to_link(elem){
        window.open("mailto:cxm4176@g.rit.edu");
}
