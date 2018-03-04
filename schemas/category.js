var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    products: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
    ]
}, { minimize: false });

var Category = mongoose.model('Category', CategorySchema);

module.exports = Category;