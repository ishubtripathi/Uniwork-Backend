const ipfsClient = require('ipfs-http-client');

exports.uploadToIPFS = async (file) => {
    const client = ipfsClient.create('https://ipfs.infura.io:5001');
    const added = await client.add(file.buffer);
    return added.path;  // IPFS hash
};
