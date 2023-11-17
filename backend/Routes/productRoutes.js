const express = require('express');
const { addProducts,getProducts,deleteProduct,getSingleProduct,UpdateProduct,SearchUser } = require('../controllers/productControllers');
const verifyToken = require('../middleware/verifyToken');

const productRoutes = express.Router();

productRoutes.route('/add').post(verifyToken,addProducts);
productRoutes.route('/getproducts').get(verifyToken,getProducts);
productRoutes.route('/:id').delete(verifyToken,deleteProduct)
productRoutes.route('/:id').get(verifyToken,getSingleProduct)
productRoutes.route('/:id').put(verifyToken,UpdateProduct)
productRoutes.route('/search/:key').get(verifyToken,SearchUser)

module.exports = productRoutes