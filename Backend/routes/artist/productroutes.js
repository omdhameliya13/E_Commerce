const express = require('express');
const multer = require('multer');
const product = require('../../controllers/artist/productcontroller');
const {protect} = require('../../middleware/authmiddleware');


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

router.post('/addProduct',protect, upload.single('image'), product.addproduct);
router.get('/getProduct/:id',protect,product.getproduct);
router.delete('/deleteProduct/:id',protect,product.deleteproduct);
router.put('/updateProduct/:id',protect,upload.single('image'),product.updateproduct);

module.exports = router;