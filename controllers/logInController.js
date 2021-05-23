const express = require(`express`);
const session = require(`express-session`);
const bodyParser = require(`body-parser`);
const db = require(`../models/db.js`);
const bcrypt = require('bcrypt');
const saltRounds = 10;

const logInController = {

	home: function(req, res){
		res.render("index", {status: 1});
	},

	logInError: function(req, res){			// Wrong username/pw
		res.render("index", {status: 2} );
	},

	registerError: function(req, res){		// Username taken
		res.render("index", {status: 3} );
	},

	registerError2: function(req, res){		// Field is blank
		res.render("index", {status: 4} );
	},

	registerError3: function(req, res){		// Password validation
		res.render("index", {status: 5} );
	},

	logIn: function(req,res){
		var ulog = req.body.uname2;
		var plog = req.body.pw2;
		var answer = 0;
		console.log(plog);


		const doc = db.findOne(`users`,{"username": ulog}, function(res2){
		if(res2){ //render profile
			console.log(`User Found`);

			bcrypt.compare(plog, res2.password, function(err, equal){
				if (equal){
					req.session.loggedIn = true;
					req.session.username = ulog;
					console.log(req.session);
					res.send({answer: 1});
				} else{ 
					res.send({answer: 2});
				}
				
			});

			
		}
		else{ //render index + alert msg
			console.log(`User Not Found`);
			res.send({answer: 2});
		}
	});
	},

	register: function(req,res){
		var name = req.body.name;
		var email = req.body.contmail;
		var username = req.body.uname;
		var password = req.body.pw;
		var answer = 0;

		console.log(name);
		console.log(email);
		console.log(username);
		console.log(password);
		console.log('went to register');

		if (name.length == 0 || email.length == 0 || username.length == 0 || password.length == 0){
			// res.redirect(`/registererror2`);
			console.log('error 1');
			answer = 1;
			res.send({answer: 1});
		}
		else{

			var test=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

			if(password.match(test)){
				bcrypt.hash(password, saltRounds, function(err, hash){
					var person = {
						name: name,
						email: email,
						username: username,
						password: hash,
						bio: "",
						avatar: "vrz8v5xx7s.jpg",
						cover: "nkym6m0pcv.jpg",
						website: ""
					}

					db.findOne(`users`, {"username": username}, function(res2){
						if(res2){
							console.log(`User Exists`);
							// res.redirect(`/registererror`);
							console.log('error 2');
							answer =  2;
							res.send({answer: 2});

						} else{
							console.log(`Register success!`);
							db.insertOne(`users`, person);

							req.session.loggedIn = true;
							req.session.username = username;
							console.log(req.session);
							// res.redirect(`/editprofile`);
							answer =  4;
							res.send({answer: 4});
						}
					});

				});
				

				
			}
			else{ 
				// res.redirect(`/registererror3`);
				console.log('error 3');
				answer =  3;
				res.send({answer: 3});
			}
			
		}		

	}
}

module.exports = logInController;