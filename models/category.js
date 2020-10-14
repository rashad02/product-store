const mongo = require('mongoose');
const Schema = mongo.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        rating: Number
    }
});

module.exports = mongo.model('Category', categorySchema);