var ethers = require('ethers');
var fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'))
const checkWallet = require('./checkWallet');
// const params = JSON.parse(fs.readFileSync('params.json', 'utf8'))

const ABI_FILE_PATH = './ABI/USDC.json'
const USDCContract = config.USDCContract

async function checkBalance() {
    let provider = ethers.getDefaultProvider('https://rpc.open-campus-codex.gelato.digital')
    const data = await fs.promises.readFile(ABI_FILE_PATH, 'utf8');
    const abi = JSON.parse(data);

    let contract = new ethers.Contract(USDCContract,abi,provider);
    balance = await contract.balanceOf(checkWallet())

    return balance;
}

module.exports = checkBalance;