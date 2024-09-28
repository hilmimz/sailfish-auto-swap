const { ethers } = require('ethers');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const privateKey = config.privateKey;

function getAddressFromPrivateKey() {
    const wallet = new ethers.Wallet(privateKey);
    return wallet.address;
}

module.exports = getAddressFromPrivateKey;