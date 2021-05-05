var mongoose = require('mongoose');

var comment = new mongoose.Schema({
    postId: {
        type: String
    },
    icon: {
        type: String
    },
    commentUser: {
        type: String
    },
    commentText: {
        type: String
    },
    commentID: {
        type: String
    }
});

module.exports = mongoose.model('comments', comment);