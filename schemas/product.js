var mongoose = require('mongoose');
var Category = require("./category");

var ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Category' 
	}
}, { minimize: false });

ProductSchema.post('save', function(doc) {
	console.log('%s - %s da luu product', doc._id, doc.category);
	doc.model('Category').update(
        { _id: doc.category}, 
        { $push: { products: doc._id } });
});

var Product = mongoose.model('Product', ProductSchema);

module.exports = Product;