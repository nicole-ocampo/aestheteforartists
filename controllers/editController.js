const db = require("../models/db.js");
const editsubmission = require("../models/editsubmission.js");
const fs = require('fs');
const multer = require('multer');
const express = require(`express`);
const session = require(`express-session`);
const bodyParser = require(`body-parser`);
var ObjectId = require('mongodb').ObjectID;
const helper = require("./helper.js");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const editController = {

    editProfile: function(req,res){
        res.render("editprofile");
    },

    editProfileError: function(req,res){
        res.render("editprofile", {status: 2});
    },

    editProfileError2: function(req,res){
        res.render("editprofile", {status: 3});
    },

    editProfileSuccess: function(req,res){
        res.render("editprofile", {status: 1});
    },

    saveInfo: function(req, res){

        var nameOne = req.body.dname;
        var websiteOne = req.body.website;
        var bioOne = req.body.bio;

        var sessionuser = req.session.username;
        var submittedInfo = new editsubmission({
            user: sessionuser
            // image: req.file.path 
        });


        var imgName = Math.random().toString(36).slice(2);
        var imgName2 = helper.renameImg(req, imgName);
        submittedInfo.imageUrl = imgName2;

        if (nameOne.length == 0 && websiteOne.length == 0 && bioOne.length == 0 && imgName2 == null)
            res.redirect(`/editprofileerror2`);
        else{
            db.findOne(`users`, {"username": sessionuser}, function(res2){
            
            if (nameOne.length == 0)
                nameOne = res2.name;
            
            if (websiteOne.length == 0)
                websiteOne = res2.website;

            if (bioOne.length == 0)
                bioOne = res2.bio;

            if (imgName2 == null)
                imgName2 = res2.avatar;

            var updatef = {
                $set: 
                {
                 name: nameOne,
                 website: websiteOne,
                 bio: bioOne,
                 avatar: imgName2}
            }

                db.updateMany(`users`, {"username": sessionuser}, updatef);
                res.redirect('/editprofilesuccess');
            }); 
        }
        

    },

    deleteProfile: function(req,res){
        db.deleteOne(`users`, {"username": req.session.username});
        db.deleteMany(`posts`, {"user": req.session.username});
        db.deleteMany(`comments`, {"commentUser": req.session.username});

        db.findOne(`likes`, {"user": req.session.username}, function(res2){

            if (res2 != null){
                var arr = res2.likedposts;
                var len = arr.length;

                var objarray = [];

                for(var i=0; i<len; i++){
                    objarray[i] = new ObjectId(arr[i]);
                }

                console.log(objarray);
                db.findMany(`posts`, {"_id": {"$in": objarray}}, function(res3){
                    
                    for(var i=0; i<res3.length; i++){
                        var likes = res3[i].likes;
                        var new_likes = Number(likes)-1;
                        var new_likes_str = String(new_likes);

                        var updatef ={
                            $set: {likes: new_likes_str}
                        }
                        
                        db.updateOne(`posts`, {"_id": ObjectId(res3[i]._id)}, updatef);
                    }              
                });
            }
        });

        db.deleteOne(`likes`, {"user": req.session.username});
        res.redirect(`/logout`);
     },

     editAccount: function(req,res){
        var nemail = req.body.contmail;
        var nusername = req.body.uname;
        var npassword = req.body.pw;


        var sessionuser = req.session.username;
        var submittedInfo = new editsubmission({
            user: sessionuser
        });

        var imgName = Math.random().toString(36).slice(2);
        var imgName2 = helper.renameImg(req, imgName);
        submittedInfo.imageUrl = imgName2;

        if (nemail.length == 0 && nusername.length == 0 && npassword.length == 0 && imgName2 == null)
            res.redirect(`/editprofileerror2`);
        else{
            db.findOne(`users`, {"username": sessionuser}, function(res2){
            

                if (nemail.length == 0)
                    nemail = res2.email;
                
                if (nusername.length == 0)
                    nusername = res2.username;

                if (imgName2 == null)
                    imgName2 = res2.cover;
                
                if (npassword.length == 0){
                    npassword = res2.password;

                    var updatef = {
                        $set: 
                        {email: nemail,
                        username: nusername,
                        password: npassword,
                        cover: imgName2
                        }
                    }

                    db.updateMany(`users`, {"username": sessionuser}, updatef);
            
                    var updateg = {
                    $set: {commentUser: nusername}
                    }

                    db.updateMany(`comments`, {"commentUser": sessionuser}, updateg);

                    var updateh ={
                        $set: {user: nusername}
                    }

                    db.updateMany(`posts`, {"user": sessionuser}, updateh);

                    var updatei ={
                        $set: {user: nusername}
                    }

                    db.updateOne(`likes`, {"user": sessionuser}, updateh); 

                    if (req.body.uname.length > 0)
                        req.session.username = req.body.uname;
            
                    res.redirect('/editprofilesuccess');
                }
                else{
                    var test=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
                    if (npassword.match(test)){

                        bcrypt.hash(npassword, saltRounds, function(err, hash){
                            var updatef = {
                                $set: 
                                {email: nemail,
                                username: nusername,
                                password: hash,
                                cover: imgName2
                                }
                            }

                            db.updateMany(`users`, {"username": sessionuser}, updatef);
                    
                            var updateg = {
                            $set: {commentUser: nusername}
                            }

                            db.updateMany(`comments`, {"commentUser": sessionuser}, updateg);

                            var updateh ={
                                $set: {user: nusername}
                            }

                            db.updateMany(`posts`, {"user": sessionuser}, updateh);

                            var updatei ={
                                $set: {user: nusername}
                            }

                            db.updateOne(`likes`, {"user": sessionuser}, updateh); 

                            if (req.body.uname.length > 0)
                                req.session.username = req.body.uname;
                    
                            res.redirect('/editprofilesuccess');
                        });

                    } else
                        res.redirect(`/editprofileerror`);
                }
            });

            
        } // endif
    }
}

  
module.exports = editController;