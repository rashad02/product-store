const mongo = require('mongoose');
const Schema = mongo.Schema;

const productSchema = new Schema({
    productName: {
    type: String,
    required: true
    },
    brandName: {
        type: String,
        required: false
    },
    productDetails: {
        type: String,
        required: false
    },
    productImage: {
        type: String,
        required: false
    },
    productPrice: {
        type: Number,
        required: true
    },
    productCategory: {
        type: String,
        required: true
    }
   
});

module.exports = mongo.model('Product', productSchema);