const Web3 = require('web3');
const { abi, contractAddress } = require('../config/blockchainConfig');

// Initialize Web3 with the Infura provider
const web3 = new Web3(process.env.INFURA_URL); // No need for HttpProvider in newer versions

// Create a new contract instance
const nftContract = new web3.eth.Contract(abi, contractAddress);

// Function to mint an NFT
exports.mintNFT = async (userId, ipfsHash) => {
    try {
        // Get the accounts available in the web3 instance
        const accounts = await web3.eth.getAccounts();

        // Send the transaction to mint the NFT
        const tx = await nftContract.methods.mintNFT(userId, ipfsHash).send({ from: accounts[0] });

        // Return the token ID from the transaction receipt
        return tx.events.Transfer.returnValues.tokenId; // NFT Token ID
    } catch (error) {
        console.error("Error minting NFT:", error);
        throw error; // Rethrow the error for further handling
    }
};
