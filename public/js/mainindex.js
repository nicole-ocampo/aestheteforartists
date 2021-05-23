$(document).ready(function () {

    $('#regsubmit').click(function () {

    	var formdata = $('form#signupForm').serializeArray();

    	var namePassed = $('#name').val();
		var emailPassed = $('#contmail').val();
		var unamePassed = $('#uname').val();
		var passWordPassed = $('#pw').val();

    	if (formdata[0].value == ''){
    		$('#errorMessage').text('Fill up all fields.');
    	} else if (formdata[1].value == ''){
    		$('#errorMessage').text('Fill up all fields.');
    	} else if (formdata[2].value == ''){
    		$('#errorMessage').text('Fill up all fields.');
    	} else if (formdata[3].value == ''){
    		$('#errorMessage').text('Fill up all fields.');
    	} else {
    		$('#errorMessage').text('');
    		$.post('/register', {name: namePassed, 
            	contmail: emailPassed, 
            	uname: unamePassed, 
            	pw: passWordPassed}, function(result) {
				if (result.answer == 1 ){
              	     window.location.href = ("/registererror");
                } else if (result.answer == 2 ){
                 	window.alert('Username taken. Please try again.');
                } else if (result.answer == 4 ){
                	window.location = "/editprofile";
                } else if (result.answer == 3 ){
                  	window.alert('Password must be 8-15 characters, with at least one uppercase character, one digit, and one special character.');
                }
			});
    	}

    });

    $('#logsubmit').click(function () {

    	var formdata = $('form#loginForm').serializeArray();

    	var unamePassed = $('#uname2').val();
		var pwPassed = $('#pw2').val();

    	if (formdata[0].value == ''){
    		$('#errorMessage2').text('Fill up all fields.');
    	} else if (formdata[1].value == ''){
    		$('#errorMessage2').text('Fill up all fields.');
    	} else {
    		$('#errorMessage2').text('');
    		$.post('/login', {uname2: unamePassed, 
            	pw2: pwPassed}, function(result) {
				if (result.answer == 1 ){
                  	window.location.href = ("/editprofile");
                } else if (result.answer == 2 ){
              	     window.alert('Wrong username/password.');
                } 
			});
    	}

    });


    $('#wrap1nav').click(function () {

        document.getElementById("wrap2nav").style.backgroundColor ="transparent";
		document.getElementById("wrap3nav").style.backgroundColor ="transparent";
		document.getElementById("wrap4nav").style.backgroundColor ="transparent";

		var el = document.getElementById("wrap1nav");
		el.style.backgroundColor = "white";
    });

    $('#wrap2nav').click(function () {

        document.getElementById("wrap1nav").style.backgroundColor ="transparent";
		document.getElementById("wrap3nav").style.backgroundColor ="transparent";
		document.getElementById("wrap4nav").style.backgroundColor ="transparent";

		var el = document.getElementById("wrap2nav");
		el.style.backgroundColor = "white";
    });

    $('#wrap3nav').click(function () {

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
    });

    $('#wrap4nav').click(function () {

        document.getElementById("wrap1nav").style.backgroundColor ="transparent";
		document.getElementById("wrap2nav").style.backgroundColor ="transparent";
		document.getElementById("wrap3nav").style.backgroundColor ="transparent";

		var el = document.getElementById("wrap4nav");
		el.style.backgroundColor = "white";
    });


    $('#signupnav').click(function () {

        document.getElementById("login").style.display="none";

		var el = document.getElementById("signup");
		el.style.display="block";
		el.style.animation = 'none';
		el.offsetHeight; /* trigger reflow */
		el.style.animation = null; 
    });


    $('#loginnav').click(function () {

        document.getElementById("signup").style.display="none";

		var el = document.getElementById("login");
		el.style.display="block";
		el.style.animation = 'none';
		el.offsetHeight; /* trigger reflow */
		el.style.animation = null; 
    });



 //    $('a[href*=#]:not([href=#])').click(function() {
 //  	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
 //    || location.hostname == this.hostname) {

 //    var target = $(this.hash);
 //    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

 //    if (target.length) {
 //      var bodyElement = $("html,body");
 //      if ($.browser.safari) { 
 //        bodyElement = $("body")
 //      }

 //      bodyElement.animate({
 //        scrollTop: target.offset().top
 //      }, 1000);

 //      return false;
 //    }
 //  	}
	// });



})
