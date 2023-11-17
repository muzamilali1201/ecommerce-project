const mongoose = require('mongoose');

const productModel = new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    company:String,
    userId:String
});

module.exports = mongoose.model('Products',productModel)