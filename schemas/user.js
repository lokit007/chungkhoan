var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    pass: {
        type: String,
        trim: true
    },
    registers: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Register' }
    ]
}, { minimize: false });

var User = mongoose.model('User', UserSchema);

module.exports = User;