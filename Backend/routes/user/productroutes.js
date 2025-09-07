const express = require('express');
const product = require('../../controllers/user/productcontroller');
const {protect} = require('../../middleware/authmiddleware');


const router = express.Router();

router.get('/getProduct',product.getproduct);

module.exports = router;