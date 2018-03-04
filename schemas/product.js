var mongoose = require('mongoose');

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

ProductSchema.post('save', function(doc, next) {
	doc.model('Category').update(
        { _id: doc.category}, 
        { $push: { products: doc } },
        (err, count) => {
            if(err) console.log(err.message);
            next();
        });
});

ProductSchema.pre('remove', function(next) {
    console.log('%s has been removed', this._id);
    this.model('Category').update(
        { _id: this.category}, 
        { $pull: { products: {"_id": this._id} } },
        (err, count) => {
            if(err) console.log(err.message);
            next();
        });
});

var Product = mongoose.model('Product', ProductSchema);

module.exports = Product;