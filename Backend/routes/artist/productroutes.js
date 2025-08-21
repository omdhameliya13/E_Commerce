const express = require('express');
const multer = require('multer');
const product = require('../../controllers/artist/productcontroller');


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

router.post('/addProduct', upload.single('image'), product.addproduct);
router.get('/getProduct/:id',product.getproduct);
router.delete('/deleteProduct/:id',product.deleteproduct);
router.put('/updateProduct/:id',upload.single('image'),product.updateproduct);

module.exports = router;