document.getElementById("accs").addEventListener("click", accsettings);
document.getElementById("profs").addEventListener("click", profsettings);
document.getElementById("deletebutton").addEventListener("click", deleteacc);

function accsettings(){
	document.getElementById("formwrap2").style.display="none";

	var el = document.getElementById("formwrap");
	el.style.display="block";
	el.style.animation = 'none';
	el.offsetHeight; /* trigger reflow */
	el.style.animation = null; 

	document.getElementById("accs").style = "border: 1px solid #a0a0a0;";
	document.getElementById("profs").style = "border: 0px;";
}

function profsettings(){
	document.getElementById("formwrap").style.display="none";

	var el = document.getElementById("formwrap2");
	el.style.display="block";
	el.style.animation = 'none';
	el.offsetHeight; /* trigger reflow */
	el.style.animation = null; 

	document.getElementById("profs").style = "border: 1px solid #a0a0a0;";
	document.getElementById("accs").style = "border: 0px;";
}

function deleteacc(){
	if (confirm("Are you sure you want delete your account?")) {
	    window.location.href = "/deleteprofile";
	} 
} 

function checkstat(stat){
	if (stat == 1)
		window.alert("Changes have been saved!");
	else if (stat == 2)
		window.alert("Password must be 8-15 characters, with at least one uppercase character, one digit, and one special character.");
	else if (stat == 3)
		window.alert("No fields are filled out."); 
}