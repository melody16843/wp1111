//cross part
function add_cross(){
    var CrossListener = 
    document.getElementsByClassName("google-meet__guest-x");


    for(var i=0; i<CrossListener.length; i++){
        (function(){
            var id = CrossListener[i].id
            var temp=document.getElementById(id);
            temp.addEventListener("click", 
                function(){
                    console.log(id);
                    temp.parentElement.remove();
                }
            )   
        }())
    }
}


//reshape main when no guest
function reshape(){
    var CrossListener = 
    document.getElementsByClassName("google-meet__guest-x");
    for(var i=0; i<CrossListener.length; i++){
        (function(){
            var id = CrossListener[i].id
            var temp=document.getElementById(id);
            temp.addEventListener("click", 
                function(){
                    if(CrossListener.length == 0 ){
                        var main_icon = document.getElementById("guest-0-icon").getAttribute("src");
                        var main_name = document.getElementsByClassName("google-meet__guest-name")[0].innerHTML;
                        document.getElementsByClassName("google-meet__main-icon")[0].setAttribute("src", main_icon);
                        document.getElementById("main").innerHTML = main_name;
                        console.log(main_icon);
                        console.log(main_name);
                        var guest_list = document.getElementsByClassName("google-meet__guest-list");
                        guest_list[0].remove();
                        document.getElementsByClassName("google-meet__main-block")[0].style.width = '100%';
                        var main_block = document.getElementsByClassName("google-meet__main-block")[0];
                        main_block.style.display = "flex";

                    }
                }
            )   
        }())
    }
}


add_cross();
reshape();
//reshape main and guest blocks when unpin or pin
var pin_list = {"pm":true, "p0":false, "p1":false, "p2":false, "p3":false, "p4":false, "p5":false};
var current_pin = "0";
for(var i=0; i<Object.keys(pin_list).length; i++){
    // var check = Object.keys(pin_list)[i];
    // if (check=="pm"){
    //     continue;
    // }
    (function(){
        var id = Object.keys(pin_list)[i];
        var temp=document.getElementById(id);
        temp.addEventListener("click", 
            function(){
                console.log(document.getElementsByClassName("google-meet__guest-x").length);
                if(pin_list[id]==false && pin_list['pm']==true){
                    console.log('yy')
                    var main_icon = document.getElementById("guest-"+id[1]+"-icon").getAttribute("src");
                    var main_name = document.getElementById("guest-"+id[1]+"-name").innerHTML;
                    document.getElementsByClassName("google-meet__main-icon")[0].setAttribute("src", main_icon);
                    document.getElementById("main").innerHTML = main_name;
                    document.getElementById("guest-"+id[1]).style.display = "none";
                    document.getElementById("guest-"+current_pin).style.display = "flex";
                    pin_list[id] = true;
                    pin_list["p"+current_pin]=false;
                    pin_list['pm']=true;
                    current_pin=id[1];
                     //add back
                     add_cross();
                     reshape();
                }
                else if(pin_list[id]==true &&pin_list["pm"]==true){
                    //get namd and icon of current main and delete 
                    var main_icon = document.getElementsByClassName("google-meet__main-icon")[0].getAttribute("src");
                    var main_name = document.getElementById("main").innerHTML;
                    document.getElementsByClassName("google-meet__main-icon")[0].setAttribute("src", "");
                    document.getElementById("main").innerHTML = "";
                    //change style of guest list
                     var guest_list = document.getElementsByClassName("google-meet__guest-list")[0];
                     var main_block = document.getElementsByClassName("google-meet__main-block")[0];
                     var guest_space = document.getElementsByClassName("google-meet__space")[0];
                     guest_space.style.display = "none";
                     main_block.style.display = "none";
                     guest_list.style.width = "100%";

                    //turn on display
                    document.getElementById("guest-"+current_pin).style.display="flex";
                    

                     
                    var guest_block = document.getElementsByClassName("google-meet__guest-block");
                    for(var i=0; i<guest_block.length; i++){
                    guest_block[i].style.height = "300px";
                    guest_block[i].style.width = "500px";
                    }

                    //add back
                    add_cross();
                    reshape();
                   
                    //change list value
                    pin_list['p'+current_pin] = false;
                    pin_list['pm']=false;
                    current_pin="none";
                    

                }
                else if(pin_list[id]==false && pin_list['pm']==false){
                    //change block style
                    document.getElementsByClassName("google-meet__main-block")[0].style.display = "flex";
                    document.getElementsByClassName("google-meet__space")[0].style.display = "flex";
                    document.getElementsByClassName("google-meet__guest-list")[0].style.width = "30%";
                    var guest_block = document.getElementsByClassName("google-meet__guest-block");
                    for(var i=0; i<guest_block.length; i++){
                    guest_block[i].style.width = "200px";
                    guest_block[i].style.height = "150px";
                    }
                    var main_icon = document.getElementById("guest-"+id[1]+"-icon").getAttribute("src");
                    var main_name = document.getElementById("guest-"+id[1]+"-name").innerHTML;
                    document.getElementsByClassName("google-meet__main-icon")[0].setAttribute("src", main_icon);
                    document.getElementById("main").innerHTML = main_name;
                    document.getElementById("guest-"+id[1]).style.display = "none"
                   //change name and icon of main block
                   pin_list[id] = true;
                   pin_list['pm']=true;
                   current_pin=id[1];

                  //add back
                  add_cross();
                  reshape();
                }
            }
        )   
    }())
}



