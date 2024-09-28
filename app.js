const { ethers } = require('ethers');
const readlineSync = require('readline-sync');
const colors = require('colors');
const path = require('path');
const fs = require('fs');
const checkConnection = require('./src/checkRPC');
const checkWallet = require('./src/checkWallet');
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
        const numTx = readlineSync.question(
            '\nHow many transaction do you want? '
          );
        for (let i = 0; i < numTx; i++) {
            curTx = i+1;
            console.log(('Processing #'+curTx+' transaction').yellow);
            result = await swap();
            logToFile(result.hash);
            console.log(('✅ '+result.hash).green)
            if (curTx < numTx) {
                const delay = getRandomDelay();
                console.log(('Delay for '+delay+'ms\n').blue)
                await sleep(delay);
            }
        }
        console.log(('\n'+curTx+'/'+numTx+' transaction completed!').green);
        console.log('Check log.txt for all transaction history'.green)

    }
}

main();