const express = require('express');
const multer = require('multer');
const { uploadWork, searchByTokenId } = require('../controllers/workController');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to upload work and mint NFT
router.post('/upload', upload.single('file'), uploadWork);

// Route to search work by NFT token ID
router.get('/search/:tokenId', searchByTokenId);

module.exports = router;
