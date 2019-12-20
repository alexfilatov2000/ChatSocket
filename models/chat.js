const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    author:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    }
});


module.exports = mongoose.model('chat', chatSchema);
