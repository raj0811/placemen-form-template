const express = require('express');
const router = express.Router();
const homeController = require('../controllers/hom_controller');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


// setv routes
router.get('/', homeController.home);

router.post('/upload', upload.single('pdfFile'),homeController.send)




module.exports = router; 