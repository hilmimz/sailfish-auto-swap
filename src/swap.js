var ethers = require('ethers');
var fs = require('fs');
var web3 = require('web3');
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'))

const ABI_FILE_PATH = './ABI/Vault.json'
const SailFishContract = config.SailfishContract


async function swap() {
    let provider = ethers.getDefaultProvider('https://rpc.open-campus-codex.gelato.digital')
    const data = await fs.promises.readFile(ABI_FILE_PATH, 'utf8');
    const abi = JSON.parse(data);

    let contract = new ethers.Contract(SailFishContract,abi,provider);

    let signer = new ethers.Wallet(config.privateKey, provider);
    const signed_contract = new ethers.Contract(SailFishContract, abi, signer);

    tokenRef = [
        "0x00000000000000000000000077721d19bdfc67fe8cc46ddaa3cc4c94e6826e3c",
        "0x000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    ]
    deposit = [
        "10000000000000000",
        "0"
    ]
    ops = [
        [
            "0x000000000000000000000000be7967f98d152140564a6f394a9b46220f9fd35e",
            [
                "0x000000000000000000000000000000000000000000000000002386f26fc10000",
                "0x010100000000000000000000000000000000000000000012725dd1e4ac1b0000"
            ],
            "0x00"
        ]
    ]

    const result = await signed_contract.execute(tokenRef,deposit,ops,{
        gasLimit: 10000000,
        nonce: undefined,
      });
    
    // console.log(result.hash)

    return result;
}

module.exports = swap;