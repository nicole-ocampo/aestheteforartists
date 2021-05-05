const dotenv = require(`dotenv`);
const fs = require(`fs`);
const express = require(`express`);
const session = require(`express-session`);
const bodyParser = require(`body-parser`);
const db = require(`../models/db.js`);
const alert = require(`alert`);
const app = express();
 
var multer = require('multer');
var storage = multer.diskStorage({
    destination:  './public/avatar',
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
}),
upload = multer({ storage: storage }).single('pimg');

var storage2 = multer.diskStorage({
    destination:  './public/cover',
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
}),
upload2 = multer({ storage: storage2 }).single('cimg');

var storage3 = multer.diskStorage({
    destination:  './public/posts',
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
}),
upload3 = multer({ storage: storage3 }).single('cpimg');

//controllers

const logInController = require("../controllers/logInController.js");
const helper = require("../controllers/helper.js");
const editController = require("../controllers/editController.js");
const postController = require("../controllers/postController.js");

app.use(bodyParser.urlencoded({ extended: false}));


app.use(session({
	secret:`Keep it secret`,
	resave: true,
	name: `uniqueSessionID`,
	saveUninitialized: true
}));
 


app.get(`/`, function(req, res){
	if(req.session.loggedIn)
		res.redirect(`/editprofile`);
	else
		res.redirect(`/home`);
	
});


app.post(`/register`, logInController.register);
app.post(`/login`, bodyParser.urlencoded(), logInController.logIn);
app.post(`/editaccount`, upload2, editController.editAccount);
app.get(`/logout`, helper.logOut);
app.get(`/deleteprofile`, editController.deleteProfile);

app.get(`/home`, logInController.home);
app.get(`/loginerror`, logInController.logInError);
app.get(`/registererror`, logInController.registerError);
app.get(`/registererror2`, logInController.registerError2);
app.get(`/registererror3`, logInController.registerError3);

app.get(`/editprofile`, editController.editProfile);
app.get(`/editprofileerror`, editController.editProfileError);
app.get(`/editprofileerror2`, editController.editProfileError2);
app.get(`/editprofilesuccess`, editController.editProfileSuccess);

app.post(`/editprofileset`, upload, editController.saveInfo);
app.get(`/profile`, helper.renderProfilePage);
app.get('/post/:id', postController.viewPost)
app.post(`/uploadpost`, upload3, postController.uploadPost);
app.get(`/deletepost/:id`, postController.deletePost);
app.post(`/editpost`, postController.editPost);
app.get(`/tag/:id`, helper.renderTags);
app.post(`/search`, helper.searchQuery);
app.get(`/searchnotfound`, helper.searchNotFound);
app.get(`/user/:id`, helper.renderUser);
app.get(`/feed`, helper.renderFeed);
app.post(`/like`, postController.likePost);
app.post(`/unlike`, postController.unlikePost);
app.get(`/uploadComment/:id`, postController.uploadComment);
app.get(`/editcomment`, postController.editComment);
app.get(`/deletecomment/:id`, postController.deleteComment);



module.exports = app;