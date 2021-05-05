var d1 = document.getElementById("d1");

d1.onclick = function(){
  var el = document.getElementById("tc1");

  if (confirm("Are you sure you want delete your post?")) {
    window.location.href = "/deletepost";
  } 

}

/*
var thumbsview1 = document.getElementById("thumbsview1");
var feedthumbs1 = document.getElementById("thumb1");
var addpost = document.getElementById("addpostbutton");
var apview = document.getElementById("addpostsc");

addpost.onclick = function(){
  apview.style.display = "block";
}


thumb1.onclick = function(){
	thumbsview1.style.display = "block";
}



window.onclick = function(event) {
  if (event.target == thumbsview1) {
    thumbsview1.style.display = "none";
  }


  if (event.target == apview) {
    apview.style.display = "none";
  }
}


function submitComment1(){
  event.preventDefault();

  //get post
  var input = document.getElementById("mycomment1").value;

  var prepre = "<a title=\"Comment is currently under review\">";
  var prehtml = "<div class=\"commentusericonbox\"> <div class=\"commentusericon\" id=\"cui11\"> <img src=\"works/user1/tokkyuicon.jpg\"></div></div>"
  var midhtml ="<a href=\"3aprofile.html\"><span class=\"unamec\">@tokkyu</span></a> "

  var comb = prepre + prehtml + midhtml +  "&nbsp" + "&nbsp" + "&nbsp" ;


  var newpost = document.createElement('div');
  newpost.className = "commentscont";
  newpost.innerHTML = comb + input + "</a>";
  newpost.style.opacity ="0.5";
  newpost.style.marginTop ="10px";
  document.getElementById('tbd1').appendChild(newpost);
}




var like1 = document.getElementById("like1");

like1.onclick = function(){

  var el = document.getElementById("post1likes");
  if (like1.src.match("icons/nolike.png")){
    like1.src="icons/like.png";
    el.innerHTML = "6318 likes";
  }
  
  else{
    like1.src="icons/nolike.png";
    el.innerHTML ="6317 likes"
  }
}




var edit1 = document.getElementById("toggle1");

edit1.onclick = function(){
    var el = document.getElementById("tc1");

    if (el.style.display =="none")
        el.style.display ="block";
    else
        el.style.display ="none";

}




var d1 = document.getElementById("d1");

d1.onclick = function(){
  var el = document.getElementById("tc1");

  if (confirm("Are you sure you want delete your post?")) {
    document.getElementById("thumb1").style.display = "none";
    thumbsview1.style.display = "none";
  } 

}


var e1 = document.getElementById("e1");

e1.onclick = function(){
  var el = document.getElementById("epa1");

  el.style.display ="block"
}


function saveedit1(){
  var desc = document.getElementById("desc1");
  desc.innerHTML = document.getElementById("myeditedpost1").value;
 
  document.getElementById("epa1").style.display="none";
  document.getElementById("tc1").style.display="none";
}
*/