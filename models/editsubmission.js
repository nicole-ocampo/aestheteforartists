var mongoose = require('mongoose');

var editsubmission = new mongoose.Schema({
    imageUrl: {
        type:String
    }, user: {
        type:String
    }
});

module.exports = mongoose.model('editsubmission', editsubmission);