const Work = require('../models/Work');
const { uploadToIPFS } = require('../ipfs/ipfsUtils');
const { mintNFT } = require('../blockchain/blockchainUtils');

exports.uploadWork = async (req, res) => {
    try {
        const file = req.file;
        const userId = req.body.userId;

        // Upload file to IPFS
        const ipfsHash = await uploadToIPFS(file);

        // Mint NFT
        const nftTokenId = await mintNFT(userId, ipfsHash);

        // Save metadata to MongoDB
        const newWork = new Work({
            userId,
            ipfsHash,
            nftTokenId,
            fileType: file.mimetype,
            fileName: file.originalname,
            uploadedAt: new Date(),
        });
        await newWork.save();

        res.json({ message: 'File uploaded and NFT minted!', nftTokenId });
    } catch (error) {
        res.status(500).send('Error uploading file');
    }
};

exports.searchByTokenId = async (req, res) => {
    const { tokenId } = req.params;

    // Fetch NFT details from MongoDB
    const work = await Work.findOne({ nftTokenId: tokenId });
    if (!work) return res.status(404).send('Work not found');

    res.json({
        owner: work.userId,
        ipfsHash: work.ipfsHash,
        fileType: work.fileType,
        fileName: work.fileName,
        uploadedAt: work.uploadedAt
    });
};
