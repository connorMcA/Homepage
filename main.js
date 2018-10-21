function changeRight(id){
        var right = document.getElementById('right');
        var rightDivs = right.querySelectorAll("#right>div");
        right.className = "RightMenu";

        for(var i = 0; i < rightDivs.length; i++){


                if(rightDivs[i].id == id){
                        rightDivs[i].className = "show";
                }
                else{
                        rightDivs[i].className = "hidden";
                }
        }
}


function go_to_link(link){
        if(link =='mail')
                window.open("mailto:cxm4176@g.rit.edu");
        else if (link == 'github')
                window.open("https://github.com/WNM-Code/SpotiDJ")

}


function displayContent(id){
        var backButton = document.getElementById('backButton');
        if(id == 'main'){
                backButton.className = "hidden";

        }
        else{
                backButton.className = "show";
        }
        var contents = document.querySelectorAll('#phoneContents>div');
        for(var i = 0; i < contents.length; i++){
                if (contents[i].id == id){
                        contents[i].className = "show";
                }
                else{
                        contents[i].className = "hidden";
                }
        }
}
