const { ethers } = require('ethers');
const readlineSync = require('readline-sync');
const colors = require('colors');
const path = require('path');
const fs = require('fs');
const checkConnection = require('./src/checkRPC');
const checkWallet = require('./src/checkWallet');
const checkBalance = require('./src/checkBalance');
const swap = require('./src/swap');

const logFilePath = path.join(__dirname, 'log.txt');

const logToFile = (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${message}\n`;

    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Error writing on log', err);
        }
    });
};

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

const getRandomDelay = () => {
    return Math.floor(Math.random() * (10 - 3 + 1) + 3) * 1000;
};

const decimals18 = 1000000000000000000;
const balanceThreshold = 0.0002*decimals18;
const delayForEvery = 400;


async function main() {
    console.log('Hello! this program is created by Hilmimz'.green)
    console.log('Shortly this program will swap USDC into EDU on Sailfish Vedex'.green)
    console.log("Checking RPC Connection...".green)
    await checkConnection();

    console.log('\nWallet address: '+checkWallet());
    const walletOption = readlineSync.question(
        'Use this wallet? y/n\n'
      );
    if (walletOption == 'n') {
        return 0;
    } else {
        const pair_index = readlineSync.question(
            '\nWhich token pair to swap?\n1. USDC-EDU\n2. USDC-SAIL\n3. USDC-GRASP\n'
          );
        const numTx = readlineSync.question(
            '\nHow many transaction do you want? '
          );
        var curTx = 0;
        var succTx = 0
        for (let i = 0; i < numTx; i++) {
            const balance = await checkBalance()
            if (balance.toString() < balanceThreshold) {
                console.log(('Your balance is lower than '+balanceThreshold/decimals18+' USDC').red)
                break;
            }
            else{
                curTx += 1;
                if (curTx%delayForEvery == 0) {
                    const delay_minutes = getRandomDelay()*60;
                    const minutes = delay_minutes/60000;
                    console.log(('Delay for every '+delayForEvery+' transactions - '+minutes+' minutes\n').blue)
                    await sleep(delay_minutes);
                }
                console.log(('Processing #'+curTx+' transaction').yellow);

                result = await swap(pair_index)
                logToFile(result.hash);
                console.log(('✅ '+result.hash).green)
                if (curTx < numTx) {
                    const delay = getRandomDelay();
                    console.log(('Delay for '+delay+'ms\n').blue)
                    await sleep(delay);
                succTx += 1;
                }
            }
        }
        console.log(('\n'+succTx+'/'+numTx+' transaction completed!').green);
        console.log('Check log.txt for all transaction history'.green)

    }
}

main();