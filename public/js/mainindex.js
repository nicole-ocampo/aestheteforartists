document.getElementById("wrap1nav").addEventListener("click", nav1clicked);
document.getElementById("wrap2nav").addEventListener("click", nav2clicked);
document.getElementById("wrap3nav").addEventListener("click", nav3clicked);
document.getElementById("wrap4nav").addEventListener("click", nav4clicked);

document.getElementById("signupnav").addEventListener("click", signclick);
document.getElementById("loginnav").addEventListener("click", logclick);

function signclick(){
		document.getElementById("login").style.display="none";

		var el = document.getElementById("signup");
		el.style.display="block";
		el.style.animation = 'none';
		el.offsetHeight; /* trigger reflow */
		el.style.animation = null; 
	}

function logclick(){
	document.getElementById("signup").style.display="none";

	var el = document.getElementById("login");
	el.style.display="block";
	el.style.animation = 'none';
	el.offsetHeight; /* trigger reflow */
	el.style.animation = null; 
}

function nav1clicked(){
	document.getElementById("wrap2nav").style.backgroundColor ="transparent";
	document.getElementById("wrap3nav").style.backgroundColor ="transparent";
	document.getElementById("wrap4nav").style.backgroundColor ="transparent";

	var el = document.getElementById("wrap1nav");
	el.style.backgroundColor = "white";
}

function nav2clicked(){
	document.getElementById("wrap1nav").style.backgroundColor ="transparent";
	document.getElementById("wrap3nav").style.backgroundColor ="transparent";
	document.getElementById("wrap4nav").style.backgroundColor ="transparent";

	var el = document.getElementById("wrap2nav");
	el.style.backgroundColor = "white";
}

function nav3clicked(){
	document.getElementById("wrap1nav").style.backgroundColor ="transparent";
	document.getElementById("wrap2nav").style.backgroundColor ="transparent";
	document.getElementById("wrap4nav").style.backgroundColor ="transparent";

	var el = document.getElementById("wrap3nav");
	el.style.backgroundColor = "white";

	var p1 = document.getElementById("post1");
	var p2 = document.getElementById("post2");
	var p3 = document.getElementById("post3");
	var p4 = document.getElementById("post4");

	p1.style.display="block";
	p1.style.animation = 'none';
	p1.offsetHeight; /* trigger reflow */
	p1.style.animation = null; 

	p2.style.display="block";
	p2.style.animation = 'none';
	p2.offsetHeight; /* trigger reflow */
	p2.style.animation = null; 

	p3.style.display="block";
	p3.style.animation = 'none';
	p3.offsetHeight; /* trigger reflow */
	p3.style.animation = null; 

	p4.style.display="block";
	p4.style.animation = 'none';
	p4.offsetHeight; /* trigger reflow */
	p4.style.animation = null; 
}

function nav4clicked(){
	document.getElementById("wrap1nav").style.backgroundColor ="transparent";
	document.getElementById("wrap2nav").style.backgroundColor ="transparent";
	document.getElementById("wrap3nav").style.backgroundColor ="transparent";

	var el = document.getElementById("wrap4nav");
	el.style.backgroundColor = "white";
}

function checkstat(stat){
	if (stat == 2)
		window.alert("Wrong username/password. Please try again.");
	else if (stat == 3)
		window.alert("Username taken. Please try again.");
	else if (stat == 4)
		window.alert("You cannot leave a field blank!");
	else if (stat == 5)
		window.alert("Password must be 8-15 characters, with at least one uppercase character, one digit, and one special character.");
	
}


/* jQuery for Smooth Scrolling */
$('a[href*=#]:not([href=#])').click(function() {
  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
    || location.hostname == this.hostname) {

    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

    if (target.length) {
      var bodyElement = $("html,body");
      if ($.browser.safari) { 
        bodyElement = $("body")
      }

      bodyElement.animate({
        scrollTop: target.offset().top
      }, 1000);

      return false;
    }
  }
});

$(document).ready(function() {
	$("#regsubmit").click(function(){
		var field1 = document.getElementById("name");
		var field2 = document.getElementById("contmail");
		var field3 = document.getElementById("uname");
		var field4 = document.getElementById("pw");

		if(field1.value.length == 0){
			field1.style.border = "thick solid #B00000";
			window.alert("Please enter your display name.");
		} else if(field2.value.length == 0){
			field2.style.border = "thick solid #B00000";
			window.alert("Please enter your email address.");
		} else if(field3.value.length == 0){
			field3.style.border = "thick solid #B00000";
			window.alert("Please enter a username.");
		} else if(field4.value.length == 0){
			field4.style.border = "thick solid #B00000";
			window.alert("Please enter a password. Must be 8-15 characters, with at least one uppercase character, one digit, and one special character.");
		}
	});

	$("#logsubmit").click(function(){
		var field1 = document.getElementById("uname2");
		var field2 = document.getElementById("pw2");

		if(field1.value.length == 0){
			field1.style.border = "thick solid #B00000";
			window.alert("Please enter your username");
		} else if(field2.value.length == 0){
			field2.style.border = "thick solid #B00000";
			window.alert("Please enter your password.");
		} 
	});
});

 
