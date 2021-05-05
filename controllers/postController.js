const db = require("../models/db.js");
const editsubmission = require("../models/editsubmission.js");
const fs = require('fs');
const multer = require('multer');
const express = require(`express`);
const session = require(`express-session`);
const bodyParser = require(`body-parser`);
var ObjectId = require('mongodb').ObjectID;
const helper = require("./helper.js");

const postController = {

    uploadPost: function(req, res){

        var caption = req.body.cpcap;
        var tags = req.body.cptag;

        tags_arr = tags.split(',');

        var sessionuser = req.session.username;
        var submittedInfo = new editsubmission({
            user: sessionuser
        });

        var imgName = Math.random().toString(36).slice(2);
        var imgName2 = helper.renameImg(req, imgName);
        submittedInfo.imageUrl = imgName2;
        
        var post ={
            image: imgName2,
            user: sessionuser,
            caption: caption,
            tags: tags_arr,
            likes: "0"
        };

        db.insertOne(`posts`, post);

        res.redirect(`/profile`);

    },

    viewPost: function (req, res) {
        var originalID = ObjectId(req.params.id);
        var hexID = originalID.toHexString();
        console.log(originalID);
        console.log(hexID);

        
        db.findOne(`posts`, {"_id": ObjectId(hexID)}, function(res2){
            var sessionuser = req.session.username;
            var val;

            if (res2.user == sessionuser)
                val = true;
            else
                val = false;

            db.findMany(`comments`, {"postId": hexID}, function(res3){

                var arr = [];

                for(var i=0; i<res3.length; i++){
                    var author;

                    if (sessionuser === res3[i].commentUser)
                        author = true;
                    else
                        author = false;

                    var obj = {
                        postId: res3[i].postId,
                        icon: res3[i].icon,
                        commentUser: res3[i].commentUser,
                        commentText: res3[i].commentText,
                        commentID: res3[i].commentID,
                        isAuthor: author
                    };

                    arr.push(obj);
                }
                
                db.findOne(`likes`, {"user": sessionuser, "likedposts": hexID}, function(res4){

                if (res2.user == sessionuser)
                    val = true;
                else
                    val = false;

                if(res4 == null)
                    likedv=false;
                else
                    likedv=true;





                res.render('samplepost',{
                    author: val,
                    liked: likedv,
                    sessionu: sessionuser,
                    username: res2.user,
                    id: res2._id,
                    image:res2.image,
                    likes:res2.likes,
                    caption: res2.caption,
                    user: res2.user,
                    tags: res2.tags,
                    comments: arr
                    
                }); 

                });
            });
        });
         
    },

    deletePost: function (req, res) {
        var id = req.params.id;

        db.deleteOne(`posts`, {"_id": ObjectId(id)});
        res.redirect(`/profile`);
         
    },

    editPost: function (req, res) {
        var id = req.body.postid;
        var edit  = req.body.editedpost;

        var updatef ={
            $set: {caption: edit}
        }

        db.updateOne(`posts`, {"_id": ObjectId(id)}, updatef);
        res.redirect(`/post/` + id);
         
    },

    likePost: function (req, res) {
        var sessionuser = req.session.username;
        var id = req.body.likeid;

         db.findOne(`likes`, {"user": sessionuser}, function(res2){
            if (res2 == null){

                var arr =[];
                arr.push(id);
                var newlike = {
                    user: sessionuser,
                    likedposts: arr
                }

                db.insertOne(`likes`, newlike);

                db.findOne(`posts`, {"_id": ObjectId(id)}, function(res3){
                    var likes = res3.likes;
                    var new_likes = Number(likes)+1;
                    var new_likes_str = String(new_likes);

                    var updatef ={
                        $set: {likes: new_likes_str}
                    }

                    db.updateOne(`posts`, {"_id": ObjectId(id)}, updatef);

                    {res.redirect(`/post/`+id);}
                });
                                
            } else{
                // ensures no duplicate

                db.findOne(`likes`, {"user": sessionuser, "likedposts": id}, function(res4){
                    if (res4 == null){
                        console.log("am i called?");
                        var arr = res2.likedposts;
                        arr.push(id);

                        var updatef ={
                            $set: {likedposts: arr}
                        }

                        db.updateOne(`likes`, {"user": sessionuser}, updatef);

                        db.findOne(`posts`, {"_id": ObjectId(id)}, function(res3){
                            var likes = res3.likes;
                            var new_likes = Number(likes)+1;
                            var new_likes_str = String(new_likes);

                            var updatef ={
                                $set: {likes: new_likes_str}
                            }

                            {res.redirect(`/post/`+id);}

                            db.updateOne(`posts`, {"_id": ObjectId(id)}, updatef);
                        });

                        
                    } else
                        res.redirect(`/post/`+id);
                });
            }

         });         
             
    },

    unlikePost: function (req, res) {
        var sessionuser = req.session.username;
        var id = req.body.unlikeid;

         db.findOne(`likes`, {"user": sessionuser}, function(res2){
            var arr = res2.likedposts;
            var ind = arr.indexOf(id);

            arr.splice(ind, 1);

            var updatef ={
                $set: {likedposts: arr}
            }

            db.updateOne(`likes`, {"user": sessionuser}, updatef);


            db.findOne(`posts`, {"_id": ObjectId(id)}, function(res3){
                var likes = res3.likes;
                var new_likes = Number(likes)-1;
                var new_likes_str = String(new_likes);

                var updatef ={
                    $set: {likes: new_likes_str}
                }

                {res.redirect(`/post/`+id);}

                db.updateOne(`posts`, {"_id": ObjectId(id)}, updatef);
            });

         });  
             
    },
     uploadComment: function(req, res){

        // var userComment = req.body.comment;
        var userComment = req.query.mycomment1;
        var originalID = ObjectId(req.params.id);
        var hexID = originalID.toHexString();
        var comID = Math.random().toString(36).slice(2);

        var sessionuser = req.session.username;
        var commentIcon = null;

        db.findOne(`users`, {"username": sessionuser}, function(res2){

                comment.icon = res2.avatar;
                db.insertOne(`comments`, comment);
        });
        
        var comment = {
            postId: hexID,
            icon: commentIcon,
            commentUser: sessionuser,
            commentText: userComment,
            commentID: comID
        };
        
        // renderProfilePage();
        res.redirect(`/post/` + hexID);
        console.log(userComment);
        console.log("upload comment passed");
    },

    deleteComment: function (req, res) {
        var id = req.params.id;

        db.findOne(`comments`, {"commentID": id}, function(res2){

                postID = res2.postId;

                if(res2.commentID == id)
                    res.redirect(`/post/` + postID);

                db.deleteOne(`comments`, {"commentID": id});

        });
        // res.redirect(`/profile`);
         
    },

    editComment: function(req, res){
        var id = req.query.commentId;
        var newComment = req.query.editedcomment;
        var postID = req.query.postid2;
        console.log(id);
        console.log(postID);
        console.log(newComment);

        var updatef ={
            $set: {commentText: newComment}
        }


        db.updateOne(`comments`, {"commentID": id}, updatef);

        db.findOne(`comments`, {"commentID": id}, function(res2){

                postID = res2.postId;

                if(res2.commentID == id)
                    res.redirect(`/post/` + postID);

        });
        // res.redirect(`/profile`); 
    }
    
}

  
module.exports = postController;