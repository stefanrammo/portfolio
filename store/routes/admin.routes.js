const express = require('express');

const adminController = require('../controllers/admin_controller');

const router = express.Router();

router.get('/products', adminController.getProducts);

router.get('/products/new', adminController.getNewProduct);

module.exports = router;