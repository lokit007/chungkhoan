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
// Middleware sau thay đổi
RegisterSchema.post('save', function(doc, next) {
	doc.model('User').update(
        { _id: doc._user}, 
        { $push: { registers: doc } },
        (err, count) => {
            if(err) {
                console.log(err.message);
                next();
            } else {
                doc.model('Macp').update(
                        { _id: doc._macp}, 
                        { $push: { registers: doc } },
                        (err, count) => {
                            if(err) console.log(err.message);
                            next();
                        });    
            }
        });
});
// Middleware trước thay đổi
RegisterSchema.pre('remove', function(next) {
    this.model('User').update({registers: this}, {$pull: {registers: this.id}}, { multi: true }, (err, count) => {
        if(err) {
                console.log("Lỗi tìm kiếm : " + err.message);
                next();
        } else {
                this.model('Macp').update({registers: this}, {$pull: {registers: this.id}}, { multi: true }, (err, count) => {
                        if(err) console.log("Lỗi tìm kiếm : " + err.message);
                        else next();
                });
        }
    });
});

var Register = mongoose.model('Register', RegisterSchema);

module.exports = Register;