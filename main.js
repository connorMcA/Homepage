function changeRight(id){
        var right = document.getElementById('right');
        var rightDivs = right.querySelectorAll("#right>div");
        if (id == "aboutMe"){
                right.className = "fullRight";
        }
        else{
                right.className = "newRight";
        }
        for(var i = 0; i < rightDivs.length; i++){


                if(rightDivs[i].id == id){
                        rightDivs[i].className = "show";
                }
                else{
                        rightDivs[i].className = "hidden";
                }
        }
}


function go_to_link(elem){
        window.open("mailto:cxm4176@g.rit.edu");
}
