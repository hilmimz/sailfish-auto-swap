const { ethers } = require('ethers');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'))

// Inisialisasi provider
const provider = new ethers.providers.JsonRpcProvider(config.RPC_PROVIDER);

async function checkConnection() {
    try {
        const blockNumber = await provider.getBlockNumber();
        console.log('RPC Connected! Block Number:', blockNumber);
    } catch (error) {
        console.error('RPC Error!:', error);
    }
}

module.exports = checkConnection;