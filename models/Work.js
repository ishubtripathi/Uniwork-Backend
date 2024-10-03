const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    ipfsHash: { type: String, required: true },
    nftTokenId: { type: String, required: true },
    fileType: { type: String, required: true },
    fileName: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Work', workSchema);
