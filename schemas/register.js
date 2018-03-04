var mongoose = require('mongoose');

var RegisterSchema = new mongoose.Schema({
        _user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
        },
        _macp: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Macp'
        },
        max: {
                type: Number
        },
        min: {
                type: Number
        }
}, { minimize: false });

var Register = mongoose.model('Register', RegisterSchema);

module.exports = Register;