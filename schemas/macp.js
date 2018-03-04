var mongoose = require('mongoose');

var MacpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
    },
    fullname: {
        type: String,
        trim: true
    },
    price: {
        type: Number
    },
    volume: {
        type: Number
    },
    registers: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Register' }
    ]
}, { minimize: false });

var Macp = mongoose.model('Macp', MacpSchema);

module.exports = Macp;