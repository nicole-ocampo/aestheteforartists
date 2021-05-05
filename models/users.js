var mongoose = require('mongoose');

var user = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    website: {
        type: String
    },
    avatar: {
        type: String
    },
    cover: {
        type: String
    }
});

module.exports = mongoose.model('users', user);