var ethers = require('ethers');
var fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'))
const params = JSON.parse(fs.readFileSync('params.json', 'utf8'))

const ABI_FILE_PATH = './ABI/Vault.json'
const SailFishContract = config.SailfishContract


async function swap(swap_index) {
    let provider = ethers.getDefaultProvider('https://rpc.open-campus-codex.gelato.digital')
    const data = await fs.promises.readFile(ABI_FILE_PATH, 'utf8');
    const abi = JSON.parse(data);

    let contract = new ethers.Contract(SailFishContract,abi,provider);

    let signer = new ethers.Wallet(config.privateKey, provider);
    const signed_contract = new ethers.Contract(SailFishContract, abi, signer);

    if (swap_index == 1) {
        console.log("Swap USDC to EDU".magenta);
        tokenRef = params.swap_usdc_edu.tokenRef
        deposit = params.swap_usdc_edu.deposit
        ops = params.swap_usdc_edu.ops
    } else if (swap_index == 2){
        console.log("Swap USDC to SAIL".magenta);
        tokenRef = params.swap_usdc_sail.tokenRef
        deposit = params.swap_usdc_sail.deposit
        ops = params.swap_usdc_sail.ops
    } else if (swap_index == 3){
        console.log("Swap USDC to GRASP".magenta);
        tokenRef = params.swap_usdc_grasp.tokenRef
        deposit = params.swap_usdc_grasp.deposit
        ops = params.swap_usdc_grasp.ops
    } else {
        console.log('Invalid input')
        return 0
    }
    const result = await signed_contract.execute(tokenRef,deposit,ops,{
        gasLimit: 10000000,
        nonce: undefined,
      });
    

    return result;
}

module.exports = swap;