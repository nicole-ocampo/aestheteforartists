const db = require("../models/db.js");
const editsubmission = require("../models/editsubmission.js");
const fs = require('fs');
const multer = require('multer');
const express = require(`express`);
const session = require(`express-session`);
const bodyParser = require(`body-parser`);
var ObjectId = require('mongodb').ObjectID;

const helper = {
    
    logOut: function(req,res){
        req.session.destroy(function(err){
            if (err) throw err;
        })
        res.redirect(`/home`);
        console.log(req.session);
     },

    renameImg: function(req, newName) {
        if (req.file != null){
            var originalName = req.file.originalname;
            var extension = originalName.substring(originalName.lastIndexOf("."));
            const newUrl = req.file.destination + '/' +  newName + extension; 
            
            fs.renameSync(req.file.path, newUrl);
            return newName + extension;
        }
        
    },

    renderProfilePage: function(req,res){
        var sessionuser = req.session.username;
        db.findOne(`users`, {"username": sessionuser}, function(res2){

        
        db.findMany(`posts`, {"user": sessionuser}, function(res3){
        
            res.render("profile", 
            {
                author:true,
                name: res2.name,
                bio: res2.bio,
                avatar: res2.avatar,
                cover: res2.cover,
                website: res2.website,
                posts: res3
            });

        });              
        });
    },

    renderTags: function (req, res) {
        var query = req.params.id
        db.findMany(`posts`, {"tags": query}, function(res2){
            
            if(res2.length > 0){
                res.render('tags',{
                tag:query,
                posts: res2
                }); 
            } else{
                res.redirect(`/searchnotfound`);
            }
        });
         
    },

    searchQuery: function (req, res) {
        var query = req.body.query;

        if (query.charAt(0) == "#"){
            var q = query.substring(1);
            res.redirect(`/tag/` + q);
        }
        else if (query.charAt(0) == "@"){
            var q = query.substring(1);
            res.redirect(`/user/` + q);
        } else {
            res.redirect(`/searchnotfound`);
        }
    },

    searchNotFound: function (req, res) {
        res.render("searchnotfound");   
    },

    renderUser: function (req, res) {
        var query = req.params.id;
        db.findOne(`users`, {"username": query}, function(res2){
            
            db.findMany(`posts`, {"user": query}, function(res3){
                var sessionuser = req.session.username;
                var val;
                if (query != sessionuser)
                    val = false;
                else
                    val = true;

                    res.render("profile", 
                    {
                        author: val,
                        name: res2.name,
                        bio: res2.bio,
                        avatar: res2.avatar,
                        cover: res2.cover,
                        website: res2.website,
                        posts: res3
                    });
            });


            
        });  
    },

    renderFeed: function (req, res) {
        var sessionuser = req.session.username;
        db.findMany(`posts`, {}, function(res2){
            db.findMany(`users`, {"username": {"$ne": sessionuser}}, function(res3){
                res.render(`feed`, {
                    users: res3.slice(0,5),
                    posts: res2
                });

                console.log(res3);
            });
        });
             
    }



    
}

  
module.exports = helper;