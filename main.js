window.onload = function(){
        var children = document.getElementById('projects').children;
        var indent = 10;
        for(var i = 0; i < children.length; i++){
                children[i].style.paddingLeft = indent + "px";
                indent +=20;
        }

};
