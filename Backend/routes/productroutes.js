const express = require('express');
const multer = require('multer');
const product = require('../controllers/productcontroller');
const {protect} = require('../middelware/authmiddleware')

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

router.post('/addproduct',protect, upload.single('image'), product.addproduct);
router.get('/getproduct/:id',protect,product.getproduct);
router.delete('/deleteproduct/:id',protect,product.deleteproduct);
router.put('/updateproduct/:id',upload.single('image'),product.updateproduct);

module.exports = router;